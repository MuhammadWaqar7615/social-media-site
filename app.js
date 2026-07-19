const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express')
const postRouters = require('./routes/postRoutes');
const path = require('path')
const app = express()
const PORT = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));
app.use(postRouters);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(PORT, () => {
            console.log("server is listening at port: ", PORT)
        });
    })
    .catch(err => {
        console.log('❌ MongoDB connection error:', err);
    });