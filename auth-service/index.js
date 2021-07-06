const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require('mongoose');
const User = require('./user');

app.use(express.json());

mongoose.connect("mongodb://localhost/auth-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Auth-Service DB Connected");
});

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "User doesn't exits" });
    } else {

        //Check if the entered password is valid
        if (password !== user.password) {
            return res.json({ message: "Password Incorrect" });
        }
        const payload = {
            email,
            name: user.name
        };
        jwt.sign(payload, "secret", (err, token) => {
            if (err) consoloe.log(err);
            else {
                return res.json({ token: token });
            }
        });
    }
});

app.post("/auth/register", async (req, res) => {
    const { email, password, name } = req.body;

    const userExits = await User.findOne({ email });
    if (userExits !== null) {
        return res.json({ message: "User already exits" });
    } else {
        const newUser = new User({
            name,
            email,
            password
        });
        newUser.save();
        return res.json(newUser);
    }
});

app.listen(7070, () => {
    console.log("Auth-Service at 7070");
});