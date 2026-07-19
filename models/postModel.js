const mongoose = require('mongoose');

// Define schema
const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        default: Date.now
    }
});

// Create model
const Post = mongoose.model('Post', postSchema);

// Get all posts (newest first)
const getAllPosts = async () => {
    try {
        const posts = await Post.find().sort({ timestamp: -1 });
        return posts;
    } catch (error) {
        console.log("error getting posts: ", error);
        return [];
    }
};

// Add new post
const addNewPost = async (username, content) => {
    try {
        const newPost = new Post({
            username: username,
            content: content,
            timestamp: Date.now()
        });
        await newPost.save();
        console.log("Post added successfully");
        return await getAllPosts();
    } catch (error) {
        console.log("error adding post: ", error);
        return [];
    }
};

// Delete post by id
const handledlete = async (reqId) => {
    try {
        const result = await Post.deleteOne({ _id: reqId });
        if (result.deletedCount === 1) {
            console.log("Post deleted successfully");
        } else {
            console.log("Post not found");
        }
        return await getAllPosts();
    } catch (error) {
        console.log("error deleting post: ", error);
        return [];
    }
};

module.exports = {
    getAllPosts,
    addNewPost,
    handledlete
};