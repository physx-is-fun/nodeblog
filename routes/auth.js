const express = require('express');
const router = express.Router();
const userControllers = require('./../controllers/user');
const rateLimit = require('./../middlewares/ratelimit');
const { loginRedirect } = require('./../middlewares/loginredirect');

router.get('/google', rateLimit.getGoogle, userControllers.getGoogle);
router.get('/google/callback', rateLimit.getGoogleCallback, userControllers.getGoogleCallback, loginRedirect);
//router.get('/facebook', rateLimit.getFacebook, userControllers.getFacebook);
//router.get('/facebook/callback', rateLimit.getFacebookCallback, userControllers.getFacebookCallback, loginRedirect);
router.get('/local', rateLimit.getLocal, userControllers.getLocal);
router.post('/local', rateLimit.postLocal, userControllers.postLocal);

module.exports = router;