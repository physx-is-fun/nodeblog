const express = require('express');
const router = express.Router();
const postControllers = require('./../controllers/post');
const { authentication } = require('./../middlewares/authentication');
const rateLimit = require('./../middlewares/ratelimit');

router.get('/', rateLimit.getPosts, postControllers.getPosts);
router.get('/create', rateLimit.getCreatePost, authentication, postControllers.getCreatePost);
router.post('/create', rateLimit.postCreatePost, authentication, postControllers.postCreatePost);
router.get('/update/:id', rateLimit.getUpdatePost, authentication, postControllers.getUpdatePost);
router.post('/update/:id', rateLimit.postUpdatePost, authentication, postControllers.postUpdatePost);
//router.get('/categories/:id', rateLimit.getCategoryPosts, postControllers.getCategoryPosts);
router.get('/:id', rateLimit.getPost, postControllers.getPost);
router.delete('/:id', rateLimit.deletePost, authentication, postControllers.deletePost);

module.exports = router;