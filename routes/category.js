const express = require('express');
const router = express.Router();
const categoryControllers = require('./../controllers/category');
const rateLimit = require('./../middlewares/ratelimit');
const { authentication } = require('./../middlewares/authentication');

router.post('/',rateLimit.postCategory, authentication, categoryControllers.postCategory);
router.patch('/:id',rateLimit.updateCategory, authentication, categoryControllers.updateCategory);
router.delete('/:id',rateLimit.deleteCategory, authentication, categoryControllers.deleteCategory);

module.exports = router;