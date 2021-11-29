const express = require("express");
const server = express();
const PORT = process.env.PORT || 8080;
server.set("port", PORT);

const todoLists = require("./modules/lists.js");
const users = require("./modules/users.js");

// middleware ---------------------------
server.use(express.static("public"));
server.use(express.json());

server.use(todoLists);
server.use(users);

//general error handlogig----------------
server.use(function(err, req, res, next){
	res.status(500).json({
		error: "something went wrong on the server!",
		descr: err
	}).end();
});
server.listen(server.get("port"), function(){
	
});