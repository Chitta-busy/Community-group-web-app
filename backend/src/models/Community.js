const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, enum: ['admin', 'moderator', 'member'], default: 'member' }
});

const communitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: String,
    rules: String,
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
    inviteCode: { type: String, required: true, unique: true },
    members: [memberSchema],
    tags: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Community', communitySchema);
