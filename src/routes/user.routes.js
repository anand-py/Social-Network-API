const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');


router.post('/signup', userController.signup);
router.post('/login',userController.login);



router.get('/:userId', userController.getUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
