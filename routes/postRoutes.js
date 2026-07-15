const express = require('express');
const router = express.Router();
const getPosts = require('../controllers/postController');

router.use('/', getPosts)


module.exports = router;