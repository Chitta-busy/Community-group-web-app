const express = require('express');
const { createCommunity, listCommunities, joinCommunity, joinByCode } = require('../controllers/communityController');
const auth = require('../middleware/auth');
const router = express.Router();
router.get('/', auth, listCommunities);
router.post('/', auth, createCommunity);
router.post('/:id/join', auth, joinCommunity);
router.post('/join/code', auth, joinByCode);
module.exports = router;
