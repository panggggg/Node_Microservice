const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require('mongoose');
// const User = require('./user');
const amqp = require("amqplib/callback_api");

app.use(express.json());

mongoose.connect("mongodb://localhost/product-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Product-Service DB Connected");
});

amqp.connect('amqp://localhost:5672', (connErr, connection) => {
    if (connErr) {
        throw connErr;
    }
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }

        channel.assertQueue("PRODUCT");
    });
});

app.listen(8080, () => {
    console.log("Product-Service at 8080");
});