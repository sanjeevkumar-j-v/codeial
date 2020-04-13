const express = require('express');

const router = express.Router();
const userController = require('../controllers/posts_controller');

router.get('/', userController.posts);

module.exports = router;