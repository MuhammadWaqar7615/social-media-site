const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const postRouters = require('./routes/postRoutes');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(postRouters);

// MongoDB connection with timeout options
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000
})
.then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
        console.log("server is listening at port: ", PORT);
    });
})
.catch(err => {
    console.log('❌ MongoDB connection error:', err.message);
    // Server still starts even if MongoDB fails (for testing)
    app.listen(PORT, () => {
        console.log("server is listening at port: ", PORT);
        console.log("⚠️ Warning: MongoDB not connected, database features won't work");
    });
});

// Export for Vercel
module.exports = app;