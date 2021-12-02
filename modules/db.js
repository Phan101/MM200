// setup connection ----------------------------
const pg = require("pg");
const connstring = process.env.DATABASE_URL;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl:{rejectUnauthorized: false}
}); 
  
// database methods ----------------------------
let dbMethods = {}; //create empty object

//----------------------------------------------
//----------------------------------------------
dbMethods.getAllLists = function(){
    let sql = "SELECT * FROM todolists ORDER BY id"
    return pool.query(sql); //return the promise
}
//----------------------------------------------
dbMethods.createNewList = function(header, user_id){
    let sql = "INSERT INTO todolists (id, header, visible, user_id) VALUES(DEFAULT, $1, DEFAULT, $2) returning *";
    let values = [header, user_id];
    return pool.query(sql, values); 
    
}
//----------------------------------------------
//----------------------------------------------

//----------------------------------------------
//----------------------------------------------
dbMethods.getAllListItems = function(){
    let sql = "SELECT * FROM itemlists ORDER BY itemid";
    return pool.query(sql); //return the promise
}
//----------------------------------------------
dbMethods.createListItem = function(text, listeid){
    let sql = "INSERT INTO itemlists (itemid, listeid, text, done) VALUES(DEFAULT, $1, $2, DEFAULT) returning *";
    let values = [listeid, text];
    return pool.query(sql, values); 
    
}

//----------------------------------------------
//----------------------------------------------
dbMethods.deleteFromDB = function(dbTable, dbCol, inpId){
    let sql = `DELETE FROM ${dbTable} WHERE ${dbCol} = $1 RETURNING *`;
    let values = [inpId];
    return pool.query(sql, values);//return the promise
}
dbMethods.changeDB = function(dbTable, dbCol, newDbValue, dbIfCol, inpId){
    let sql = `UPDATE ${dbTable} SET ${dbCol} = $1 WHERE ${dbIfCol} = $2 RETURNING *`;
    let values = [newDbValue, inpId];
    return pool.query(sql,values);//return the promise
}
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
dbMethods.getId = function(id) {
    let sql = "SELECT * FROM users WHERE id = $1";
    let values = [id];
    return pool.query(sql, values);
} 
//----------------------------------------------
dbMethods.createUser = function(username, password, salt) {
    let sql = "INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) returning *";
    let values = [username, password, salt];
    return pool.query(sql, values);
}
//----------------------------------------------
dbMethods.changeLastLogout = function (userid, lastLogoutText) {
    let sql = `UPDATE users SET "lastLogout" = '${lastLogoutText}' WHERE id = ${userid} RETURNING *`;
    return pool.query(sql); //return the promise
  };
// export dbMethods---------------------------------
module.exports = dbMethods;
