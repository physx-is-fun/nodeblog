const config = require('./../config/config');
const path = require('path');
const passport = require('passport');
const { pagination } = require('./../utils/pagination');
const postQueries = require('./../utils/postqueries');
const categoryQueries = require('./../utils/categoryqueries');
const tagQueries = require('./../utils/tagqueries');
const headingQueries = require('./../utils/headingqueries');
const userQueries = require('./../utils/userqueries');
const jwt = require('jsonwebtoken');
const  sendMail = require('./../utils/gmail');

exports.getFacebookCallback = passport.authenticate('facebook', { 
	failureRedirect: '/login',
	failureFlash: true
})

exports.getFacebook = passport.authenticate('facebook', { 
	scope: ['email', 'public_profile']
})

exports.getLocal = async (req, res, next) => {
	try {
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		res.status(201).render('site/account/localaccount',{categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}

exports.postLocal = passport.authenticate('local.signup',{
	successRedirect: '/account/profile',
	failureRedirect: '/account/profile',
	failureFlash: true
})

exports.getOauthUnlink = async (req, res, next) => {
	try{
		const { provider } = req.params;
		let user = req.user;
		if(provider == 'local'){
			user.email = '';
			user.password = '';
			user.emailVerified = false;
		} 
		let tokensWithoutProviderToUnlink = user.tokens.filter((token) => token.kind !== provider.toLowerCase());
		// Some auth providers do not provide an email address in the user profile. As a result, we need to verify that unlinking the provider is safe by ensuring that another login method exists.
		if (!user.email && tokensWithoutProviderToUnlink.length == 0) {
			req.flash('danger', [`The ${provider.toLowerCase()} account cannot be unlinked without another form of login enabled!` + ' Please link another account or add an email address and password!']);
			return res.status(302).redirect('/account/profile');
		}
		user[provider.toLowerCase()] = '';
		user.picture = '';
		user.tokens = tokensWithoutProviderToUnlink;
		await user.save();
		req.flash('success', [`${provider.toLowerCase()} account has been unlinked successfully!`]);
		return res.status(302).redirect('/account/profile');
		
	} catch(error){
		next(error);
	}
}

exports.getGoogleCallback = passport.authenticate('google', { 
	failureRedirect: '/login',
	failureFlash: true
})

exports.getGoogle = passport.authenticate('google', { 
	scope: ['profile', 'email'], 
	accessType: 'online', 
	prompt: 'consent' 
})

exports.getRegister = async (req, res, next) => {
	try {
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		res.status(201).render('site/account/register',{categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}

exports.postRegister = passport.authenticate('local.signup',{
	successRedirect: '/register',
	failureRedirect: '/register',
	failureFlash: true
})

exports.getLogin = async (req, res, next) => {
	try {
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		res.status(201).render('site/account/login',{categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}

exports.postLogin = passport.authenticate('local.signin',{
	failureRedirect: '/login',
	failureFlash: true
})

exports.getLogout = async (req, res, next) => {
	try {
		await req.session.destroy();
		res.clearCookie(config.sessionName);
		req.session = null;
		res.status(302).redirect('/');
	} catch (error){
		next(error);
	}
}

exports.getAccountProfile = async (req, res, next) => {
	try {
	let categories = await categoryQueries.findAll().exec();
	let headings = await headingQueries.findAll().exec();
	res.status(201).render('site/account/profile',{categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}

exports.postAccountProfile = async (req, res, next) => {
	try {
		let user = req.user;
		user.gender = req.body.gender || '';
		user.localization = req.body.localization || '';
		await user.save();
		req.flash('success',['Profile information has been updated successfully!']);
		res.status(302).redirect('/account/profile');
	} catch (error){
		next(error);
	}
}

exports.deleteAccountProfile = async (req, res, next) => {
	try {
		await userQueries.deleteOne({_id: req.user._id});
		await req.session.destroy();
		res.clearCookie(config.sessionName);
		req.session = null;
		res.status(201).send({status: true});
	} catch (error){
		next(error);
	}
}

exports.getAccountPosts = async (req, res, next) => {
	try {
		let query = {
			search_query: req.query.search_query ? req.query.search_query : "",
			category: req.query.category ? req.query.category : "",
			heading: req.query.heading ? req.query.heading : "",
		}
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		let posts = await pagination(postQueries.userFindAll(req.query,req.user._id),req.query,4,await postQueries.userFindAll(req.query,req.user._id).count());
		//req.flash('danger',posts.pageNumber ? null : ['Sorry, there are no posts!']);
		res.status(posts.pageNumber ? 201 : 404).render('site/account/posts',{query: query, categories: categories, headings: headings, posts: posts.list, currentPage: posts.currentPage, pageNumber: posts.pageNumber, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}

exports.getAccountCategories = async (req, res, next) => {
	try {
		let query = {
			search_query: req.query.search_query ? req.query.search_query : "",
			category: req.query.category ? req.query.category : "",
			heading: req.query.heading ? req.query.heading : "",
		}
		let categories2 = await pagination(categoryQueries.userFindAll(req.query,req.user._id),req.query,4,await categoryQueries.userFindAll(req.query,req.user._id).count());		
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		//req.flash('danger',categories.pageNumber ? null : ['Sorry, there are no categories!']);
		res.status(categories2.pageNumber ? 201 : 404).render('site/account/categories',{query: query, categories: categories, headings: headings, categories2: categories2.list, currentPage: categories2.currentPage, pageNumber: categories2.pageNumber,danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}

exports.getForgotPassword = async (req, res, next) => {
	try {
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		res.status(201).render('site/account/forgotpassword',{categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}

exports.postForgotPassword = async (req, res, next) => {
	try {
		let user = await userQueries.findOne({ email: req.body.email }).exec();
		if(!user){
			req.flash('danger',[`Account with that ${req.body.email} email address not found!`]);
			res.status(404).redirect('/');
		} 
		if(!user.emailVerified){
			req.flash('danger',[`Your account associated with that ${user.email} email address is not verified!`]);
			res.status(302).redirect('/');
		}
		const token = jwt.sign({user: user._id}, config.jwtsecret, { expiresIn: '6h' });
		const to = user.email;
		const subject = 'Reset your password on Myblog';
		const outputHTML = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
		Please click on the following link, or paste this into your browser to complete the process:\n\n
		${req.protocol}://${req.headers.host}/resetpassword/${token}\n\n
		If you did not request this, please ignore this email and your password will remain unchanged.\n`;
		const options = {
			to: to,
			subject: subject,
			html: outputHTML
		};
		let info = await sendMail(options);
		req.flash('success',['An e-mail has been sent successfully with further instructions!']);
		res.status(302).redirect('/');
	} catch (error){
		next(error);
	}
}

exports.getResetPassword = async (req, res, next) => {
	try {
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		res.status(201).render('site/account/resetpassword',{categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}

exports.postResetPassword = async (req, res, next) => {
	try {
		const id = jwt.verify(req.params.token,config.jwtsecret).user;
		const user = await userQueries.findById(id);
		if(!user){
			req.flash('danger',['User not found!']);
			res.status(404).redirect('/');
		} 
		if(!user.emailVerified){
			req.flash('danger',[`Your account associated with that ${user.email} email address is not verified!`]);
			res.status(302).redirect('/');
		}
		user.password = req.body.password;
		user.save();
		const to = user.email;
		const subject = 'Reset your password on Myblog';
		const outputHTML = `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
		const options = {
			to: to,
			subject: subject,
			html: outputHTML
		};
		let info = await sendMail(options);
		req.flash('success',['Your password has been changed successfully!']);
		res.status(302).redirect('/');
	} catch (error){
		next(error);
	}
}

exports.postChangePassword = async (req, res, next) => {
	try {
		let user = req.user;
		let isMatch = await user.validPassword(req.body.password);
		if (isMatch) {
			req.flash('danger',['The new and the previous password are the same!']);
			res.status(403).redirect('/account/profile');		
		}
		user.password = req.body.password;
		user.save();
		const to = user.email;
		const subject = 'Change your password on Myblog';
		const outputHTML = `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
		const options = {
			to: to,
			subject: subject,
			html: outputHTML
		};
		let info = await sendMail(options);
		req.flash('success',['Your password has been changed successfully!']);
		res.status(302).redirect('/account/profile');			
	} catch (error){
		next(error);
	}
}

exports.getRecoverEmail = async (req, res, next) => {
	try {
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		res.status(201).render('site/account/recoveremail',{categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}

exports.postRecoverEmail = async (req, res, next) => {
	try {
		let user = await userQueries.findOne({ email: req.body.email }).exec();
		if (!user) {
			req.flash('danger',[`Account with that ${email} email address not found!`]);
			res.status(404).redirect('/');
		}
		let token = jwt.sign({user: user._id}, config.jwtsecret, { expiresIn: '6h' });
		const to = user.email;
		const subject = 'Email recovery on Myblog';
		const outputHTML = `You are receiving this email because you (or someone else) have requested email recovery.\n\n
		Please click on the following link, or paste this into your browser to complete the process:\n\n
		${req.protocol}://${req.headers.host}/verifyemail/${token}\n\n
		If you did not request this, please ignore this email and your password will remain unchanged.\n`;
		const options = {
			to: to,
			subject: subject,
			html: outputHTML
		};
		let info = await sendMail(options);
		req.flash('success',['An e-mail has been sent successfully with further instructions!']);
		res.status(302).redirect('/');
	} catch (error){
		next(error);
	}
}

exports.getVerifyEmail = async (req, res, next) => {
	try {
		const id = jwt.verify(req.params.token,config.jwtsecret).user;
		const user = await userQueries.findById(id);
		if(!user){
			req.flash('danger',['User not found!']);
			res.status(404).redirect('/');
		}
		user.emailVerified = true;
		await user.save();
		const to = user.email;
		const subject = 'Email verification on Myblog';
		const outputHTML = `Hello,\n\nThis is a confirmation that your ${user.email} email address has been verified for your account.\n`
		const options = {
			to: to,
			subject: subject,
			html: outputHTML
		};
		let info = await sendMail(options);
		req.flash('success',[`Your ${user.email} email address has been verified successfully!`]);
		res.status(302).redirect('/');
	} catch (error){
		next(error);
	}
}

exports.postChangeEmail = async (req, res, next) => {
	try {
		if(req.user.email == req.body.email){
			req.flash('danger',['The new and the previous emails are the same!']);
			res.status(302).redirect('/account/profile');	
		}
		let token = jwt.sign({user: req.user._id, email: req.body.email}, config.jwtsecret, { expiresIn: '6h' });
		const to = req.body.email;
		const subject = 'Email change on Myblog';
		const outputHTML = `You are receiving this email because you (or someone else) have requested email change.\n\n
		Please click on the following link, or paste this into your browser to complete the process:\n\n
		${req.protocol}://${req.headers.host}/changeemail/${token}\n\n
		If you did not request this, please ignore this email and your password will remain unchanged.\n`;
		const options = {
			to: to,
			subject: subject,
			html: outputHTML
		};
		let info = await sendMail(options);
		req.flash('success',[`An e-mail has been sent successfully to the new ${req.body.email} email address with further instructions!`]);
		res.status(302).redirect('/account/profile');
	} catch (error){
		next(error);
	}
}

exports.getChangeEmail = async (req, res, next) => {
	try {
		let token = jwt.verify(req.params.token,config.jwtsecret);
		const id = token.user;
		const email = token.email;
		let user = await userQueries.findById(id);
		if(!user){
			req.flash('danger',['User not found!']);
			res.status(404).redirect('/');
		}
		user.email = email;
		await user.save();
		const to = user.email;
		const subject = 'Email change on Myblog';
		const outputHTML = `Hello,\n\nThis is a confirmation that your previous email address has been changed to ${user.email} for your account.\n`
		const options = {
			to: to,
			subject: subject,
			html: outputHTML
		};
		let info = await sendMail(options);
		req.flash('success',[`Your previous email address has been changed to ${user.email} successfully!`]);
		res.status(302).redirect('/');
	} catch (error){
		next(error);
	}
}

exports.getAccountTags = async (req, res, next) => {
	try {
		let tags = await pagination(tagQueries.userFindAll(req.query,req.user._id),req.query,4,await tagQueries.userFindAll(req.query,req.user._id).count());		
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		//req.flash('danger',tags.pageNumber ? null : ['Sorry, there are no tags!']);
		res.status(tags.pageNumber ? 201 : 404).render('site/account/tags',{categories: categories, headings: headings, tags: tags.list, currentPage: tags.currentPage, pageNumber: tags.pageNumber, danger: req.flash('danger'), success: req.flash('success')});
	} catch(error) {
		next(error);
	}
}

exports.getAccountHeadings = async (req, res, next) => {
	try {
		let query = {
			search_query: req.query.search_query ? req.query.search_query : "",
			category: req.query.category ? req.query.category : "",
			heading: req.query.heading ? req.query.heading : "",
		}
		let headings2 = await pagination(headingQueries.userFindAll(req.query,req.user._id),req.query,4,await headingQueries.userFindAll(req.query,req.user._id).count());		
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		//req.flash('danger',headings.pageNumber ? null : ['Sorry, there are no headings!']);
		res.status(headings2.pageNumber ? 201 : 404).render('site/account/headings',{query: query, categories: categories, headings: headings, headings2: headings2.list, currentPage: headings2.currentPage, pageNumber: headings2.pageNumber, danger: req.flash('danger'), success: req.flash('success')});
	} catch(error) {
		next(error);
	}
}