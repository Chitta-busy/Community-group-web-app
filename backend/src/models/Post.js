const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    parentComment: { type: mongoose.Schema.Types.ObjectId },
    votes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [String],
    fileUrl: String,
    votes: { type: Number, default: 0 },
    solvedComment: { type: mongoose.Schema.Types.ObjectId },
    comments: [commentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
