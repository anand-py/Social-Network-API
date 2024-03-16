const Post = require('../models/post.model');


exports.createPost = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!req.userData || !req.userData.userId) {
      return res.status(400).json({ error: 'User data with userId is missing in the request' });
    }

    const { userId } = req.userData;
    const newPost = await Post.create({ userId, text });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, userId: req.userData.userId },
      req.body,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const deletedPost = await Post.findOneAndDelete({ _id: postId, userId: req.userData.userId });
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
