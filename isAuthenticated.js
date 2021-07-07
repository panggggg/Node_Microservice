const jwt = require("jsonwebtoken");

//Middleware

export async function isAuthenticated(req, res, next) {
    const token = req.header["authorization"].split(" ")[1];

    jwt.verify(token, "secret", (err, user) => {
        if (err) {
            return res.json({ message: err });
        } else {
            req.user = user;
            next();
        }
    });
}