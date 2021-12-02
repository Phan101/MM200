const authUtils = require("./auth_utils.js");

// the middleware function --------------
function protect(req, res, next){
    
    let token = req.headers.authorization;

    if(!token){
        res.status(401).json({error: "No token"}).end();
        return;
    }

    let decryptedUser = authUtils.verifyToken(token);
    if(!decryptedUser){
        res.status(403).json({error: "Not a valid token"}).end();
        return;
    }

    res.locals.userid = decryptedUser.userid;
    res.locals.username = decryptedUser.user;

    next();
}
//export the function -----------
module.exports = protect;