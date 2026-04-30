const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const post = await Post.create({ ...req.body, author: req.user.id, fileUrl: req.file ? `/uploads/${req.file.filename}` : '' });
  res.status(201).json(post);
};

exports.listPosts = async (req, res) => {
  const { community, tag, q } = req.query;
  const filter = {};
  if (community) filter.community = community;
  if (tag) filter.tags = tag;
  if (q) filter.$or = [{ title: { $regex: q, $options: 'i' } }, { content: { $regex: q, $options: 'i' } }];
  const posts = await Post.find(filter).populate('author', 'name').sort({ createdAt: -1 });
  res.json(posts);
};

exports.comment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ author: req.user.id, content: req.body.content, parentComment: req.body.parentComment || null });
  await post.save();
  res.json(post);
};
