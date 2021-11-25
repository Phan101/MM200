const express = require("express");
const router = express.Router();

//db stuff
const pg = require("pg");
const dbURI = "postgres://ycandhezmksugr:38005b12ee1e7112d036d50de7e0ee9cec41c9cfe7d0f4d06bd5b30a47962eb1@ec2-54-220-223-3.eu-west-1.compute.amazonaws.com:5432/d4kl9drthfs4l" 
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
    connectionString: connstring,
    ssl:{rejectUnauthorized: false}
});
//middleware
router.get("/todoLists", async function(req, res, next) {
	try{
        let sql = "SELECT * FROM todolists";
        let allLists = await pool.query(sql)
        res.status(200).send(allLists.rows).end();
    }catch{
        next(err);
    }
});

router.get("/listItems", async function(req, res, next) {
    try{
        let sql = "SELECT * FROM itemlists";
        let allListItems = await pool.query(sql)
        res.status(200).send(allListItems.rows).end();
    }catch{
        next(err);
    }
});

router.get("/listItems/:listID", async function(req, res, next) {
    
    let input = req.params.listID;

    try{
        let sql = `SELECT * FROM itemlists WHERE listeid = $1`;//{input}x   
        let values = [input]
        let itemList = await pool.query(sql, values);
        res.status(200).send(itemList.rows).end();
    }catch{
        next(err);
    }
	
});

router.post("/newitemlists", async function(req, res, next) {
	let listeid = 3;
    let bread = "svada teskt 4";
    try{
        let sql = "INSERT INTO itemlists (itemid, listeid, text, done) VALUES(DEFAULT, $1, $2, DEFAULT) returning *";
	    let values = [listeid, bread];
        await pool.query(sql, values); 
        
        res.status(200).send("the blogpost was created successfully").end();
	}
	catch(err){
		next(err);
	}
});

router.delete("/blogposts/:itemID", async function(req, res, next){
    
    let input = req.params.itemID;
	try{
		let sql = "DELETE FROM itemlists WHERE itemid = $1 RETURNING *";
        let values = [input];
        await pool.query(sql, values);//return the promise
        res.status(200).send("the blogpost was deleted successfully").end();

	}
	catch (err){
		next(err);
	}
});

module.exports = router;