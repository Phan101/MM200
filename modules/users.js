const express = require("express");
const authUtils = require("./auth_utils.js")
const app = express.Router();

// setup connection ----------------------------
const pg = require("pg");
const dbURI = "postgres://ycandhezmksugr:38005b12ee1e7112d036d50de7e0ee9cec41c9cfe7d0f4d06bd5b30a47962eb1@ec2-54-220-223-3.eu-west-1.compute.amazonaws.com:5432/d4kl9drthfs4l";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl:{rejectUnauthorized: false}
});

//user login
app.post("/users/login", async function(req, res, next) {
	let credString = req.headers.authorization;
    let cred = authUtils.decodeCred(credString);

    if (cred.username === "" || cred.password === "") {
        res.status(401).json({error: "no username or password"}).end();
        return;
    }

    try {
        let data = await db.getUser(cred.username);
        
        if (data.rows.length > 0) {
            let userid = data.rows[0].id;
            let username = data.rows[0].username;
            let userhashpassword = data.rows[0].password;
            let usersalt = data.rows[0].salt;

            if (authUtils.verifyPassword(cred.password, userhashpassword, usersalt)){
                
                let tok = authUtils.createToken(username, userid);
                res.status(200).json({
                    msg: "The login was successful!",
                    token: tok
                }).end();
            
            }else{
                res.status(401).json({msg: "invalid password"}).end();
                return;
            }
        }else{
            res.status(403).end()
            return;
        }
    }
    catch (err){
        next(err);
    }
});

//list all users
app.get("/users", async function(req,res,next){
	try{
        let data = await db.getAllUsers();
        res.status(200).json(data.rows).end();
    }catch(err){
        next(err);
    }
});

//create a new user
app.post("/users", async function(req,res,next){
    let credString = req.headers.authorization;
    let cred = authUtils.decodeCred(credString);

    if (cred.username === "" || cred.password === "") {
        res.status(401).json({error: "no username or password"}).end();
        return;
    }

    let hash = authUtils.createHash(cred.password);

    try {
        let data = await db.createUser(cred.username, hash.value, hash.salt);

        if (data.rows.length > 0) {
            res.status(200).json({msg: "The user was created successfully"}).end();
        }else{
            throw "the user couldn't be created";
        }
    }
    catch (err){
        next(err);
    }
});

//delete a user
app.delete("/users", async function(req, res, next){
	res.status(200).send("Hello for DELETE - /users/").end();
});




// Database methods for users
let dbMethods = {}; //create empty object
//--------
dbMethods.getAllUsers = function() {
    let sql = "SELECT id, username, password, salt FROM users";
    return pool.query(sql); //return the promise
}
//--------
dbMethods.getUser = function(username) {
    let sql = "SELECT * FROM users WHERE username = $1";
    let values = [username]; 
    return pool.query(sql, values);
}
//--------
dbMethods.createUser = function(username, password, salt) {
    let sql = "INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) returning *";
    let values = [username, password, salt];
    return pool.query(sql, values);
}
//--------
dbMethods.deleteUser = function(id) {
    let sql = "DELETE FROM users WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values);
}
//--------

// Exports
module.exports = dbMethods;
module.exports = app;
