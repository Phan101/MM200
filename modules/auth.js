const authUtils = require("./auth_utils.js");

//the middleware function
function checkToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        res.status(401).json({error: "no token"}).end();
        return
    }

    let validToken = authUtils.verifyToken(token);
    if (!validToken) {
        res.status(403).json({error: "not a valid token"}).end();
        return
    }
    res.locals.userid = validToken.userid;
    res.locals.username = validToken.user;

    next()
}

//export the function--------
module.exports = checkToken;