const express = require("express");
const db = require("./db.js");
const checkToken = require("./auth");
const app = express.Router();

app.get("/list",checkToken, async function(req, res, next) {
	try{  
		let data = await db.getAllLists();
		res.status(200).json(data.rows).end();
	}
	catch(err){
		next(err);
	}
});
app.get("/itemlist",checkToken, async function(req, res, next) {
	try{  
		let data = await db.getAllListItems();
		res.status(200).json(data.rows).end();
	}
	catch(err){
		next(err);
	}
});
app.post("/blogposts", checkToken, async function(req,res,next){
	let updata = req.body;
	let userid = res.locals.userid;

	try{
		let data = await db.createBlogPosts(updata.heading, updata.blogtext, userid);

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

app.delete("/blogposts", async function(req, res, next){
	let updata = req.body;
	let id = updata.id;
	try{
		let data = await db.deleteBlogPosts(id);
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

module.exports = app;