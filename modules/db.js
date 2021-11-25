// setup connection ----------------------------
const pg = require("pg");
const dbURI = "postgres://ycandhezmksugr:38005b12ee1e7112d036d50de7e0ee9cec41c9cfe7d0f4d06bd5b30a47962eb1@ec2-54-220-223-3.eu-west-1.compute.amazonaws.com:5432/d4kl9drthfs4l";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl:{rejectUnauthorized: false}
});
  
// database methods ----------------------------
let dbMethods = {}; //create empty object

//----------------------------------------------
//----------------------------------------------
dbMethods.getAllLists = function(){
    let sql = "SELECT * FROM todolists"
    return pool.query(sql); //return the promise
}

//----------------------------------------------
//----------------------------------------------

//----------------------------------------------
//----------------------------------------------
dbMethods.getAllListItems = function(){
    let sql = "SELECT * FROM itemlists";
    return pool.query(sql); //return the promise
}
//----------------------------------------------
dbMethods.createListItem = function(text, listeid){
    let sql = "INSERT INTO itemlists (itemid, listeid, text, done) VALUES(DEFAULT, $1, $2, DEFAULT) returning *";
    let values = [listeid, text];
    return pool.query(sql, values); 
    
}
//-----------------------------------------------
dbMethods.deleteListItems = function(id){
    let sql = "DELETE FROM itemlists WHERE itemid = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values);//return the promise
}
//-----------------------------------------------
dbMethods.changeListItem = function(dbCol, newDbValue, itemID){
    let sql = `UPDATE itemlists SET ${dbCol} = $1 WHERE itemid = $2 RETURNING *`;
    let values = [newDbValue, itemID];
    return pool.query(sql,values);//return the promise
}
//----------------------------------------------
//----------------------------------------------




//----------------------------------------------
//----------------------------------------------
dbMethods.getAllUsers = function() {
    let sql = "SELECT id, username, password, salt FROM users";
    return pool.query(sql); //return the promise
}
//----------------------------------------------
dbMethods.getUser = function(username) {
    let sql = "SELECT * FROM users WHERE username = $1";
    let values = [username]; 
    return pool.query(sql, values);
}
//----------------------------------------------
dbMethods.createUser = function(username, password, salt) {
    let sql = "INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) returning *";
    let values = [username, password, salt];
    return pool.query(sql, values);
}
//----------------------------------------------
dbMethods.deleteUser = function(id) {
    let sql = "DELETE FROM users WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values);
}
//----------------------------------------------
//----------------------------------------------

// export dbMethods---------------------------------
module.exports = dbMethods;
