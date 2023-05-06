const express = require('express');
const router = express.Router();
const tagControllers = require('./../controllers/tag');
const rateLimit = require('./../middlewares/ratelimit');
const { authentication } = require('./../middlewares/authentication');

router.post('/',rateLimit.postTag, authentication, tagControllers.postTag);
router.patch('/:id',rateLimit.updateTag, authentication, tagControllers.updateTag);
router.delete('/:id',rateLimit.deleteTag, authentication, tagControllers.deleteTag);

module.exports = router;