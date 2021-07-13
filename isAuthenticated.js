const jwt = require("jsonwebtoken");

//Middleware

module.exports = async function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== 'string') {
        res.sendStatus(400);
        return;
    }
    const token = req.headers.authorization.split(" ")[1];
    //"Bearer <token>".split(" ")[1];
    //"Bearer", "<token>"

    jwt.verify(token, "secret", (err, user) => {
        if (err) {
            return res.json({ message: err });
        } else {
            req.user = user;
            next();
        }
    });
}