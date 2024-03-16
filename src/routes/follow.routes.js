const express = require('express');
const router = express.Router();
const followController = require('../controller/follow.controller');
const authJwt = require('../middleware/authJwt')


router.post('/:userId/follow', authJwt.verifyToken, followController.followUser);
router.delete('/:userId/unfollow', authJwt.verifyToken, followController.unfollowUser);
router.get('/:userId/following', authJwt.verifyToken,  followController.getFollowingUsers);
router.get('/:userId/followers', authJwt.verifyToken,  followController.getFollowers);

module.exports = router;
