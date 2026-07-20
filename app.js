const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const postRouters = require('./routes/postRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ---------- MongoDB Connection Cache (for serverless) ----------
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        const opts = {
            serverSelectionTimeoutMS: 10000,   // Wait 10s for server selection
            connectTimeoutMS: 10000,
        };
        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
            .then((mongoose) => {
                console.log('✅ MongoDB connected');
                return mongoose;
            })
            .catch((err) => {
                console.error('❌ MongoDB connection error:', err.message);
                // Return null so we can handle errors gracefully
                return null;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

// ---------- Middleware to ensure DB is ready for each request ----------
app.use(async (req, res, next) => {
    // If connection is not established, wait for it (cached after first)
    if (!cached.conn) {
        await connectDB();
    }
    // If connection failed, pass error to your error handler (optional)
    if (!cached.conn) {
        // You can choose to respond with a 503 or still proceed
        console.warn('⚠️ DB not available – requests will fail');
    }
    next();
});

// ---------- Routes ----------
app.use(postRouters);

// ---------- Start connection immediately (for cold starts) ----------
// This ensures the connection begins even before the first request.
connectDB();

// ---------- Local development server ----------
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Local server running on port ${PORT}`);
    });
}

// ---------- Export for Vercel ----------
module.exports = app;