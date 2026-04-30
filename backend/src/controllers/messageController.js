const Message = require('../models/Message');

exports.history = async (req, res) => {
  const { communityId, recipient } = req.query;
  const query = communityId
    ? { community: communityId }
    : { $or: [{ sender: req.user.id, recipient }, { sender: recipient, recipient: req.user.id }] };
  const messages = await Message.find(query).populate('sender', 'name').sort({ createdAt: 1 });
  res.json(messages);
};
