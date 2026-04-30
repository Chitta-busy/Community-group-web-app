const crypto = require('crypto');
const Community = require('../models/Community');

exports.createCommunity = async (req, res) => {
  const inviteCode = crypto.randomBytes(4).toString('hex');
  const community = await Community.create({ ...req.body, inviteCode, members: [{ user: req.user.id, role: 'admin' }] });
  res.status(201).json(community);
};

exports.listCommunities = async (req, res) => {
  const q = req.query.q || '';
  const communities = await Community.find({ name: { $regex: q, $options: 'i' } });
  res.json(communities);
};

exports.joinCommunity = async (req, res) => {
  const community = await Community.findById(req.params.id);
  if (!community) return res.status(404).json({ message: 'Not found' });
  if (!community.members.some((m) => String(m.user) === req.user.id)) {
    community.members.push({ user: req.user.id, role: 'member' });
    await community.save();
  }
  res.json(community);
};

exports.joinByCode = async (req, res) => {
  const community = await Community.findOne({ inviteCode: req.body.code });
  if (!community) return res.status(404).json({ message: 'Invalid code' });
  if (!community.members.some((m) => String(m.user) === req.user.id)) community.members.push({ user: req.user.id, role: 'member' });
  await community.save();
  res.json(community);
};
