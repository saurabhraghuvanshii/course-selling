const jwt = require("jsonwebtoken")
const { JWT_ADMIN_PASSWORD } = require("../config")

function userMiddleware(req, res, next) {
    const token = req.headers.token
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);

    if (decoded) {
        req.adminId = decoded.id;
        next();
    }else{
        res.status(403).json({
            message: "YOU are not signed in"
        })
    }
}


module.exports = {
    adminMiddleware
}