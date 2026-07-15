// const postModel = require('../models/postModel');
const { getAllPosts } = require('../models/postModel');
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
    console.log("response json: ", resp);
}

module.exports = getPosts;