const express = require('express');
const router = express.Router();
const followController = require('../controller/follow.controller');


router.post('/:userId/follow', followController.followUser);
router.delete('/:userId/unfollow', followController.unfollowUser);
router.get('/:userId/following', followController.getFollowingUsers);
router.get('/:userId/followers', followController.getFollowers);

module.exports = router;
