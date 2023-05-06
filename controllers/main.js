const config = require('./../config/config');
const  sendMail = require('./../utils/gmail');
const postQueries = require('./../utils/postqueries');
const categoryQueries = require('./../utils/categoryqueries');
const headingQueries = require('./../utils/headingqueries');

exports.getIndex = async (req, res, next) => {
	try {
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		let latestPosts = await postQueries.latestFindAll().exec();
		res.status(201).render('site/main/index',{categories: categories, headings: headings, latestPosts: latestPosts, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}

exports.getContact = async (req, res, next) => {
	try {
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		res.status(201).render('site/main/contact',{categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}

exports.postContact = async (req, res, next) => {
	try {
		const to = req.body.email;
		const subject = req.body.subject;
		const outputHTML = `
			<h2>Mail details:</h2>
			<ul>
				<li>Email: ${req.body.email} </li>
			</ul>
			<h3>Message:</h3>
			<p>${req.body.content}</p>
		`;
		const options = {
			to: to,
			subject: subject,
			html: outputHTML
		};
		let info = await sendMail(options);
		req.flash('success',['Email has been sent successfully!']);
		res.status(302).redirect('/contact');
	} catch (error){
		next(error);
	}	
}

exports.getDemoPosts = async (req, res, next) => {
	try {
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		res.status(201).render('site/post/demoposts',{categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}

exports.getDemoPost = async (req, res, next) => {
	try {
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		res.status(201).render('site/post/demopost',{categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}