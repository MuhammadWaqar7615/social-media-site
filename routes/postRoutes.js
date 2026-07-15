const express = require('express');
const router = express.Router();
const { getPosts, createNewPost, getFeedPage, getCreatePage } = require('../controllers/postController');

router.get('/', getFeedPage);
router.get('/create', getCreatePage);
router.get('/api/posts', getPosts);
router.post('/api/posts', createNewPost);

module.exports = router;