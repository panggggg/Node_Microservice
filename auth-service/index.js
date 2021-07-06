const express = require("express");
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/auth-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Auth-Service DB Connected");
});

app.use(express.json());

app.listen(7070, () => {
    console.log("Auth-Service at 7070");
});