const express = require('express');
const { createPost, listPosts, comment } = require('../controllers/postController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();
router.get('/', auth, listPosts);
router.post('/', auth, upload.single('file'), createPost);
router.post('/:id/comment', auth, comment);
module.exports = router;
