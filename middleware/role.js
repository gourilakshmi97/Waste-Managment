const role = (allowedRole) => {

    return (req, res, next) => {

        // Check if user's role matches
        if (req.user.role !== allowedRole) {
            return res.send("Access Denied ❌");
        }

        // Allow access
        next();

    };

};

module.exports = role;