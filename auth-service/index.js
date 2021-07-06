const express = require("express");
const app = express();

app.use(express.json());

app.listen(7070, () => {
    console.log("Auth-Service at 7070");
});