const express = require('express');
const router = express.Router();
const userControllers = require('./../controllers/user');
const rateLimit = require('./../middlewares/ratelimit');
const { authentication } = require('./../middlewares/authentication');

router.get('/profile', rateLimit.getAccountProfile, authentication, userControllers.getAccountProfile);
router.post('/profile', rateLimit.postAccountProfile, authentication, userControllers.postAccountProfile);
router.delete('/profile', rateLimit.deleteAccountProfile, authentication, userControllers.deleteAccountProfile);
router.get('/logout', rateLimit.getLogout, authentication, userControllers.getLogout);
router.get('/posts', rateLimit.getAccountPosts, authentication, userControllers.getAccountPosts);
router.get('/categories', rateLimit.getAccountCategories, authentication, userControllers.getAccountCategories);
router.get('/tags', rateLimit.getAccountTags, authentication, userControllers.getAccountTags);
router.get('/headings', rateLimit.getAccountHeadings, authentication, userControllers.getAccountHeadings);
router.post('/changepassword', rateLimit.postChangePassword, authentication, userControllers.postChangePassword);
router.post('/changeemail', rateLimit.postChangeEmail, authentication, userControllers.postChangeEmail);
router.get('/unlink/:provider', rateLimit.getOauthUnlink, authentication, userControllers.getOauthUnlink);

module.exports = router;