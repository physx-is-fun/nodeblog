const express = require('express');
const router = express.Router();
const mainControllers = require('./../controllers/main');
const userControllers = require('./../controllers/user');
const rateLimit = require('./../middlewares/ratelimit');
const { validation } = require('./../middlewares/validation');
const validationRules = require('../utils/validationrules');
const { loginRedirect } = require('./../middlewares/loginredirect');

router.get('/', rateLimit.getIndex, mainControllers.getIndex);
router.get('/contact', rateLimit.getContact, mainControllers.getContact);
router.post('/contact', rateLimit.postContact, mainControllers.postContact);
//router.get('/demoposts', rateLimit.getDemoPosts, mainControllers.getDemoPosts);
//router.get('/demopost', rateLimit.getDemoPost, mainControllers.getDemoPost);
router.get('/register', rateLimit.getRegister, userControllers.getRegister);
router.post('/register', rateLimit.postRegister, validation(validationRules.schema2), userControllers.postRegister);
router.get('/login', rateLimit.getLogin, userControllers.getLogin);
router.post('/login', rateLimit.postLogin, validation(validationRules.schema1), userControllers.postLogin, loginRedirect);
router.get('/forgotpassword', rateLimit.getForgotPassword, userControllers.getForgotPassword);
router.post('/forgotpassword', rateLimit.postForgotPassword, userControllers.postForgotPassword);
router.get('/resetpassword/:token', rateLimit.getResetPassword, userControllers.getResetPassword);
router.post('/resetpassword/:token', rateLimit.getResetPassword, userControllers.getResetPassword);
router.get('/verifyemail/:token', rateLimit.getVerifyEmail, userControllers.getVerifyEmail);
router.get('/recoveremail', rateLimit.getRecoverEmail, userControllers.getRecoverEmail);
router.post('/recoveremail', rateLimit.postRecoverEmail, userControllers.postRecoverEmail);
router.get('/changeEmail/:token', rateLimit.getChangeEmail, userControllers.getChangeEmail);

module.exports = router;