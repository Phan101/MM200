const express = require("express");
const server = express();
const PORT = process.env.PORT || 8080;
server.set("port", PORT);

const blogposts = require("./modules/blogposts.js");
const users = require("./modules/users.js");
// middleware ---------------------------
server.use(express.static("public"));
server.use(express.json());

server.use(blogposts);
server.use(users);

server.use(function(err, req, res, next){
	res.status(500).json({
		error: "Something went wrong on the server!",
		descr: err
	}).end();
})

// start server ------------------------
server.listen(server.get("port"), function () {
	//console.log("server running", server.get("port"));
});


// Test auth functions
const authUtils = require("./modules/auth_utils.js");

let hash = authUtils.createHash("kongolav"); // pw
//console.log(hash);

let token = authUtils.createToken("beo", 1); // brukernavn
//console.log(token);

let payload = authUtils.verifyToken(token);
//console.log(payload);