const express = require("express");
const db = require("./db.js");
//const protect = require("./auth");
const router = express.Router();
 
router.get("/list", async function(req, res, next) {
	try{  
		let data = await db.getAllLists();
		res.status(200).json(data.rows).end();
	}
	catch(err){
		next(err);
	}
});
router.get("/itemlist", async function(req, res, next) {
	try{  
		let data = await db.getAllListItems();
		res.status(200).json(data.rows).end();
	}
	catch(err){
		next(err);
	}
});
router.post("/blogposts", async function(req,res,next){
	let updata = req.body;
	let userid = res.locals.userid;

	try{
		let data = await db.createListItem(updata.heading, updata.blogtext, userid);

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

router.delete("/itemlist", async function(req, res, next){
	let updata = req.body;
	let id = updata.id;
	try{
		let data = await db.deleteListItems(id);
		if (data.rows.length > 0){
			res.status(200).json({msg: "The blogpost was deleted successfully"}).end();
		}
		else{
			throw "The blogpost couldn't be deleted";
		}
	}
	catch (err){
		next(err);
	}
});

router.post("/itemlist", async function(req,res,next){
	let updata = req.body;
	
	try{
		let data = await db.changeListItem(updata.dbCol, updata.newDbText, updata.id);
		if (data.rows.length > 0){
			res.status(200).json({msg: "The blogpost was updated successfully"}).end();
		}
		else{
			throw "The blogpost couldn't be updated";
		}
	}catch (err){

	}
});

module.exports = router;