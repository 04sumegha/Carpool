const jwt = require('jsonwebtoken');
const logger = require('../lib/logging');

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
    // Retrieve the token from the request's authorization header
    // const authHeader = req.headers['authorization'];
    // // Usually, the token is sent as "Bearer TOKEN", split by space
    // const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        logger.error("Middleware - authenticate - token not present");
        return res.sendStatus(401); // If there's no token, return a 401 Unauthorized status
    }

    // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //     if (err) {
    //         logger.error("Invalid Token");
    //         return res.sendStatus(403); // If token is not valid, return a 403 Forbidden status
    //     }

    //     // If token is verified, attach the decoded user to the request and proceed
    //     req.user = user;
    //     console.log(req.user);
    //     next();
    // });
};

module.exports = authenticateToken;
