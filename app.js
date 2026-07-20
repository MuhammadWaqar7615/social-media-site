const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const postRouters = require('./routes/postRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(postRouters);

// MongoDB connection cache (for serverless)
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        const opts = {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        };
        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
            .then((mongoose) => {
                console.log('✅ MongoDB connected');
                return mongoose;
            })
            .catch((err) => {
                console.error('❌ MongoDB connection error:', err.message);
                // Don't throw – let the app start anyway (you can still serve static pages)
                return null;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

// For local development: start server only when not in Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    });
}

// Export the app for Vercel (no listen)
module.exports = app;