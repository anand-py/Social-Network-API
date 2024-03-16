const express = require('express');
const router = express.Router();
const postController = require('../controller/post.controller');
const authJwt = require('../middleware/authJwt');

router.post('/', authJwt.verifyToken, postController.createPost);
router.get('/:postId', postController.getPost);
router.put('/:postId', authJwt.verifyToken, postController.updatePost);
router.delete('/:postId', authJwt.verifyToken, postController.deletePost);

module.exports = router;
