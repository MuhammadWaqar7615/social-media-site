// const postModel = require('../models/postModel');
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
    // console.log('These are the total posts: ', posts);
    const resp = res.json({posts})
}

const createNewPost = async (req, res) => {
    // console.log("req", req.body);
    const name = req.body.username;
    const content = req.body.content;
    const createPost = await addNewPost(name, content);
    res.redirect('/')
}
const deletePost = ((req, res) => {
    const reqId = req.params.id;
    handledlete(reqId);
    res.status(200).json({
        message: 'Post deleted successfully',
        id: reqId
    })
})

module.exports = {
    getFeedPage,
    getCreatePage,
    getPosts,
    createNewPost,
    deletePost
}