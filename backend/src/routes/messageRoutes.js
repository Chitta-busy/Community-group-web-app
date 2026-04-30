const express = require('express');
const { history } = require('../controllers/messageController');
const auth = require('../middleware/auth');
const router = express.Router();
router.get('/', auth, history);
module.exports = router;
