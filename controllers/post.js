const config = require('./../config/config');
const path = require('path');
const fs = require('fs');
const { pagination } = require('./../utils/pagination');
const postQueries = require('./../utils/postqueries');
const categoryQueries = require('./../utils/categoryqueries');
const headingQueries = require('./../utils/headingqueries');

exports.getPosts = async (req, res, next) => {
	try {
		let query = {
			search_query: req.query.search_query ? req.query.search_query : "",
			category: req.query.category ? req.query.category : "",
			heading: req.query.heading ? req.query.heading : "",
		}
		let posts = await pagination(postQueries.findAll(req.query),req.query,4,await postQueries.findAll(req.query).count());
		let latestPosts = await postQueries.latestFindAll().exec();
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		//req.flash('danger',posts.pageNumber ? null : ['Sorry, there are no posts!']);
		res.status(posts.pageNumber ? 201 : 404).render('site/post/index',{query: query, posts: posts.list, currentPage: posts.currentPage, pageNumber: posts.pageNumber, latestPosts: latestPosts, categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
	} catch(error){
		next(error);
	}
}

exports.getPost = async (req, res, next) => {
	try {
		let post = await postQueries.findById(req.params.id).exec();
		let latestPosts = await postQueries.latestFindAll().exec();
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		if(post){
			res.status(201).render('site/post/post',{post:post, latestPosts: latestPosts, categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
		} else {
			req.flash('danger',['Sorry, the post cannot be found!']);
			res.status(404).redirect('/posts');
		}
	} catch(error){
		next(error);;
	}
}

exports.getCreatePost = async (req, res, next) => {
	try {
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		res.status(201).render('site/post/create',{categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
	} catch(error){
		next(error);
	}
}

exports.postCreatePost = async (req, res, next) => {
	try {
		let post_image = req.files.post_image;
		const extension = post_image.name.split('.')[post_image.name.split('.').length -1];
		const name = `${Math.round(Math.random()*100000000000)}.${extension}`;
		post_image.name = name
		postQueries.create({...req.body, post_image: `/img/postimages/${post_image.name}`, author: req.user.id});
		post_image.mv(path.resolve(__dirname, '../public/img/postimages',post_image.name));
		req.flash('success',['Post has been created successfully!']);
		res.status(301).redirect('/posts/create');
	} catch (error){
		next(error);
	}
}

exports.getUpdatePost = async (req, res, next) => {
	try {
		let post = await postQueries.findOne({ _id: req.params.id}).exec();
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		if(post){
			res.status(201).render('site/post/update',{post:post, categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
		} else {
			req.flash('danger',['Sorry, the post cannot be found!']);
			res.status(404).redirect('/posts');
		}
	} catch (error){
		next(error);
	}
}

exports.postUpdatePost = async (req, res, next) => {
	try {
		let post = await postQueries.findOne({ _id: req.params.id}).exec();
		if(post){
			post.title = req.body.title;
			post.intro = req.body.intro;
			post.content = req.body.content;
			post.date = req.body.name;
			post.category = req.body.category;
			post.heading = req.body.heading;
			if(req.files){
				fs.unlinkSync(path.resolve(__dirname, '../public') + post.post_image);
				let post_image
				post_image = req.files.post_image;
				const extension = post_image.name.split('.')[post_image.name.split('.').length -1];
				const name = `${Math.round(Math.random()*100000000000)}.${extension}`;
				post_image.name = name;
				post_image.mv(path.resolve(__dirname, '../public/img/postimages',post_image.name));
				post.post_image = `/img/postimages/${post_image.name}`
			}
			await post.save();
			req.flash('success',['Post has been updated successfully!']);
			res.status(302).redirect(req.baseUrl + req.path);
		} else {
			req.flash('danger',['Sorry, the post cannot be found!']);
			res.status(404).redirect('/posts');
		}
	} catch (error){
		next(error);
	}
}

exports.deletePost = async (req, res, next) => {
	try {
		let post = await postQueries.findOne({ _id: req.params.id}).exec();
		if(post){
			await postQueries.deleteOne({_id: req.params.id});
			fs.unlinkSync(path.resolve(__dirname, '../public') + post.post_image);
			req.flash('success',['Post has been deleted successfully!']);
			res.status(201).send({status: true});
		} else {
			req.flash('danger',['Sorry, the post cannot be found!']);
			res.status(404).redirect('/posts');
		}
	} catch (error){
		next(error);
	}
}

exports.getCategoryPosts = async (req, res, next) => {
	try {
		let query = {
			search_query: req.query.search_query ? req.query.search_query : "",
			category: req.query.category ? req.query.category : "",
			heading: req.query.heading ? req.query.heading : "",
		}
		let posts = await pagination(postQueries.categoryFindAll({category: req.params.id}),req.query,4,await postQueries.categoryFindAll({category: req.params.id}).count());
		let latestPosts = await postQueries.latestFindAll().exec();
		let categories2 = await categoryQueries.postsFindAll().exec();
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		//req.flash('danger',posts.pageNumber ? null : ['Sorry, there are no posts!']);
		res.status(posts.pageNumber ? 201 : 404).render('site/post/index',{query: query, posts: posts.list, currentPage: posts.currentPage, pageNumber: posts.pageNumber, categories2: categories2, latestPosts: latestPosts, categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}