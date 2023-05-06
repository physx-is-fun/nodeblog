const express = require('express');
const router = express.Router();
const headingControllers = require('./../controllers/heading');
const rateLimit = require('./../middlewares/ratelimit');
const { authentication } = require('./../middlewares/authentication');

router.post('/',rateLimit.postHeading, authentication, headingControllers.postHeading);
router.patch('/:id',rateLimit.updateHeading, authentication, headingControllers.updateHeading);
router.delete('/:id',rateLimit.deleteHeading, authentication, headingControllers.deleteHeading);

module.exports = router;