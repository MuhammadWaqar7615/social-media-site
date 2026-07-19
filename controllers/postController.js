const { getAllPosts, addNewPost, handledlete } = require('../models/postModel');
const path = require('path');

const getFeedPage = ((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'feed.html'));
})

const getCreatePage = ((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'create.html'));
})

const getPosts = async (req, res) => {
    const posts = await getAllPosts();
    res.json({posts});
}

const createNewPost = async (req, res) => {
    const name = req.body.username;
    const content = req.body.content;
    await addNewPost(name, content);
    res.redirect('/feed');
}

const deletePost = async (req, res) => {
    const reqId = req.params.id;
    await handledlete(reqId);
    res.status(200).json({
        message: 'Post deleted successfully',
        id: reqId
    });
}

module.exports = {
    getFeedPage,
    getCreatePage,
    getPosts,
    createNewPost,
    deletePost
}