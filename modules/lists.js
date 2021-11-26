const express = require("express");
const db = require("./db.js");
const protect = require("./auth.js");
const router = express.Router();
 
router.get("/list", protect, async function(req, res, next) {

	try{  
		let data = await db.getAllLists();
		res.status(200).json(data.rows).end();
	}
	catch(err){
		next(err);
	}
});
router.get("/itemlist", protect, async function(req, res, next) {
	try{  
		let data = await db.getAllListItems();
		res.status(200).json(data.rows).end();
	}
	catch(err){
		next(err);
	}
});
router.post("/blogposts", protect, async function(req,res,next){
	let updata = req.body;
	let userid = res.locals.userid;

	try{
		let data = await db.changeDB(updata.heading, updata.blogtext, userid);

		if(data.rows.length > 0){
			res.status(200).json({msg: "the blogpost was created successfully"}).end();
		}else{
			throw "the blogpost couldn't be created"
		}
	}
	catch(err){
		next(err);
	}
});
router.delete("/itemlist", protect, async function(req, res, next){
	let updata = req.body;
	try{
		let data = await db.deleteFromDB(updata.dbTable, updata.dbCol, updata.id);
		if (data.rows.length > 0){
			res.status(200).json({msg: "The item was deleted successfully"}).end();
		}
		else{
			throw "The item couldn't be deleted";
		}
	}
	catch (err){
		next(err);
	}
});

router.post("/changeitemlist", async function(req,res,next){
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

router.post("/moreLists", async function(req, res, next) {
	let updata = req.body;
    try{
        let data = await db.createNewList(updata.heading, updata.userid);
		if (data.rows.length > 0){
			res.status(200).json({msg: "The list was created successfully"}).end();
		}
		else{
			throw "The list couldn't be created";
		}
        
        res.status(200).send("the blogpost was created successfully").end();
	}
	catch(err){
		next(err);
	}
});

module.exports = router;