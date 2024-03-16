const Follow = require('../models/follow.model');
const User = require('../models/user.model')

exports.followUser = async (req, res) => {
    try {
      if (!req.userData || !req.userData.userId) {
        return res.status(400).json({ error: 'User data with userId is missing in the request' });
      }
  
      const userId = req.userData.userId;
      const userToFollowId = req.params.userId;
  
      if (userId === userToFollowId) {
        return res.status(400).json({ error: 'Cannot follow yourself' });
      }
  
      const followExists = await Follow.findOne({ follower: userId, following: userToFollowId });
  
      if (followExists) {
        return res.status(400).json({ error: 'Already following this user' });
      }
  
      const newFollow = new Follow({ follower: userId, following: userToFollowId });
      await newFollow.save();
      res.json({ message: 'User followed successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.unfollowUser = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const userToUnfollowId = req.params.userId;
    const deletedFollow = await Follow.findOneAndDelete({ follower: userId, following: userToUnfollowId });
    if (!deletedFollow) {
      return res.status(400).json({ error: 'Not following this user' });
    }
    res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFollowingUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const following = await Follow.find({ follower: userId }).populate('following', 'username');
    res.json(following.map(follow => follow.following));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followers = await Follow.find({ following: userId }).populate('follower', 'username');
    res.json(followers.map(follow => follow.follower));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
