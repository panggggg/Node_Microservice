const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require('mongoose');
const Product = require('./product');
const amqp = require("amqplib/callback_api");
const isAuthenticated = require('../isAuthenticated');

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

//Create a new product.
//Buy a product.

app.post("/product/create", isAuthenticated, async (req, res) => {
    const { name, description, price } = req.body;
    const newProduct = new Product({
        name,
        description,
        price,
    });
    return res.json(newProduct);
});

app.listen(8080, () => {
    console.log("Product-Service at 8080");
});