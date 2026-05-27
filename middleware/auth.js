const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    try {

        // Get token from headers
        const token = req.headers.authorization;

        // If token is missing
        if (!token) {
            return res.send("Access Denied ❌ No Token Provided");
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            "mysecretkey"
        );

        // Save decoded data in request
        req.user = decoded;

        // Continue to next function
        next();

    } catch (error) {

        res.send("Invalid Token ❌");
    }

};

module.exports = auth;