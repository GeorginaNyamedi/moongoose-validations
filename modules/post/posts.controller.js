const Post = require("./post.model");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json({ posts });
};

exports.createPost = async (req, res) => {
  const { title, body, published } = req.body

  const post = await Post.create({
    title,
    body,
    published,
  });

  res.status(201).json({ post });
};
