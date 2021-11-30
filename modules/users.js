const express = require("express");
const db = require("./db.js");
const authUtils = require("./auth_utils.js");
const router = express.Router();
const protect = require("./auth.js");

// endpoints ----------------------

// user login ---------------------
router.post("/users/login", async function(req, res, next){
    let credString = req.headers.authorization;
    let cred = authUtils.decodeCred(credString);

    if(cred.username === "" || cred.password === ""){
        res.status(401).json({error: "No username or password"}).end();
        return;
    }

    try {
        let data = await db.getUser(cred.username);

        if(data.rows.length > 0){
        let userid = data.rows[0].id;
        let username = data.rows[0].username;
        let passwordHash = data.rows[0].password;
        let salt = data.rows[0].salt;

            if(authUtils.verifyPassword(cred.password, passwordHash, salt)){
                let tok = authUtils.createToken(username, userid);

                res.status(200).json({
                    msg: "The login was successful!",
                    token: tok,
                    userid: data.rows[0].id
                }).end();

            }else{
                res.status(403).json({error: "Wrong password :("}).end();
                return;
            }
        } else {
            res.status(403).send("No user found");
            return;
        }
    } catch(err) {
        next(err);
    }
})

// list all users ---------------------
router.get("/users", protect, async function(req, res, next){
    try {
        let data = await db.getAllUsers();
        res.status(200).json(data.rows).end();
    }
    catch(err) {
        next(err);
    }
})

// list user ---------------------
router.post("/getuser", protect, async function(req, res, next){
    let updata = req.body;
    try {
        let data = await db.getId(updata.userId);
        res.status(200).json(data.rows).end();
    }
    catch(err) {
        next(err);
    }
})

// create a new user ---------------------
router.post("/users", async function(req, res, next){

    let credString = req.headers.authorization;
    let cred = authUtils.decodeCred(credString);

    if(cred.username === "" || cred.password === ""){
        res.status(401).json({error: "No username or password"}).end();
        return;
    }

    let hash = authUtils.createHash(cred.password);

    try{
        let data = await db.createUser(cred.username, hash.value, hash.salt);
        

        if(data.rows.length > 0){
            res.status(200).json({msg: "The user was created successfully"}).end();
        } else {
            throw "The user couldn't be created";
        }
    }
    catch(err){
        next(err);
    }
})

// update user password ---------------------
router.post("/updatepassword", async function(req, res, next){
    let updata = req.body;
    let credString = req.headers.authorization;
    let cred = authUtils.decodeCred(credString);

    if(cred.username === "" || cred.password === ""){
        res.status(401).json({error: "No username or password"}).end();
        return;
    }

    let hash = authUtils.updateHash(cred.password, updata.dbSalt);

    try{
        let data = await db.changeDB(updata.dbTable, updata.dbCol, hash.value, updata.dbID, updata.inpId);

        if(data.rows.length > 0){
            res.status(200).json({msg: "The user was created successfully"}).end();
        } else {
            throw "The user couldn't be created";
        }
    }
    catch(err){
        next(err);
    }
})

// delete a user ---------------------
router.delete("/deleteuser", protect, async function(req, res, next){
	let updata = req.body;
	try{
		let data = await db.deleteFromDB(updata.dbTable, updata.dbCol, updata.id);
		if (data.rows.length > 0){
			res.status(200).json({msg: "The user was deleted successfully"}).end();
		}
		else{
			throw "The user couldn't be deleted";
		}
	}
	catch (err){
		next(err);
	}
});


// change a user ------------
router.post("/changeuserinfo", async function(req,res,next){
	let updata = req.body;
	
	try{
		let data = await db.changeDB(updata.dbTable, updata.dbCol, updata.newDbText, updata.dbID, updata.id);
		if (data.rows.length > 0){
			res.status(200).json({msg: "The item was updated successfully"}).end();
		}
		else{
			throw "The item couldn't be updated";
		}
	}catch (err){

	}
});



// ----
module.exports = router;