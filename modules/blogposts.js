const express = require("express");
const db = require("./db.js");
const protect = require("./auth");
const router = express.Router();

router.get("/blogposts", protect, async function(req, res, next) {
	
	
	
	try{  
		let data = await db.getAllBlogPosts();
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

router.delete("/blogposts", protect, async function(req, res, next){
	let updata = req.body;
	let userid = res.locals.userid;
	try{
		let data = await db.deleteBlogPosts(updata.id, userid);
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

module.exports = router;