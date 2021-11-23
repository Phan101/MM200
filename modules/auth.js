const authUtils = require("./auth_utils.js");

//the middleware function
function protect(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        res.status(401).json({error: "no token"}).end();
        return
    }

    let payload = authUtils.verifyToken(token);
    if (!payload) {
        res.status(403).json({error: "not a valid token"}).end();
        return
    }
    res.locals.userid = payload.userid;
    res.locals.username = payload.user;

    next()
}

//export the function--------
module.exports = protect;