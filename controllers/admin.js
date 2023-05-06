const config = require('./../config/config');
const path = require('path');
const { pagination } = require('./../utils/pagination');
const postQueries = require('./../utils/postqueries');
const categoryQueries = require('./../utils/categoryqueries');
const headingQueries = require('./../utils/headingqueries');
const tagQueries = require('./../utils/tagqueries');

exports.getAdmin = async (req, res, next) => {
	try {
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		res.status(201).render('site/admin/index',{ categories: categories, headings: headings, danger: req.flash('danger'), success: req.flash('success') });
	} catch (error){
		next(error);
	}
}

exports.getAdminPosts = async (req, res, next) => {
	try {
		let query = {
			search_query: req.query.search_query ? req.query.search_query : "",
			category: req.query.category ? req.query.category : "",
			heading: req.query.heading ? req.query.heading : "",
		}
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		let posts = await pagination(postQueries.adminFindAll(req.query),req.query,4,await postQueries.adminFindAll(req.query).count());
		//req.flash('danger',posts.pageNumber ? null : ['Sorry, there are no posts!']);
		res.status(posts.pageNumber ? 201 : 404).render('site/admin/posts',{query: query, categories: categories, headings: headings, posts: posts.list, currentPage: posts.currentPage, pageNumber: posts.pageNumber, danger: req.flash('danger'), success: req.flash('success')});
	} catch (error){
		next(error);
	}
}

exports.getAdminCategories = async (req, res, next) => {
	try {
		let query = {
			search_query: req.query.search_query ? req.query.search_query : "",
			category: req.query.category ? req.query.category : "",
			heading: req.query.heading ? req.query.heading : "",
		}
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		let categories2 = await pagination(categoryQueries.adminFindAll(req.query),req.query,4,await categoryQueries.adminFindAll(req.query).count());		
		//req.flash('danger',categories.pageNumber ? null : ['Sorry, there are no categories!']);
		res.status(categories2.pageNumber ? 201 : 404).render('site/admin/categories',{query: query, categories: categories, headings: headings, categories2: categories2.list, currentPage: categories2.currentPage, pageNumber: categories2.pageNumber, danger: req.flash('danger'), success: req.flash('success')});
	} catch(error) {
		next(error);
	}
}

exports.getAdminHeadings = async (req, res, next) => {
	try {
		let query = {
			search_query: req.query.search_query ? req.query.search_query : "",
			category: req.query.category ? req.query.category : "",
			heading: req.query.heading ? req.query.heading : "",
		}
		let headings2 = await pagination(headingQueries.adminFindAll(req.query),req.query,4,await headingQueries.adminFindAll(req.query).count());		
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		//req.flash('danger',headings.pageNumber ? null : ['Sorry, there are no headings!']);
		res.status(headings2.pageNumber ? 201 : 404).render('site/admin/headings',{query: query, categories: categories, headings: headings, headings2: headings2.list, currentPage: headings2.currentPage, pageNumber: headings2.pageNumber, danger: req.flash('danger'), success: req.flash('success')});
	} catch(error) {
		next(error);
	}
}

exports.getAdminTags = async (req, res, next) => {
	try {
		let query = {
			search_query: req.query.search_query ? req.query.search_query : "",
			category: req.query.category ? req.query.category : "",
			heading: req.query.heading ? req.query.heading : "",
		}
		let tags2 = await pagination(tagQueries.adminFindAll(req.query),req.query,4,await tagQueries.adminFindAll(req.query).count());		
		let categories = await categoryQueries.findAll().exec();
		let headings = await headingQueries.findAll().exec();
		//req.flash('danger',tags.pageNumber ? null : ['Sorry, there are no tags!']);
		res.status(tags2.pageNumber ? 201 : 404).render('site/admin/tags',{query: query, categories: categories, headings: headings, tags2: tags2.list, currentPage: tags2.currentPage, pageNumber: tags2.pageNumber, danger: req.flash('danger'), success: req.flash('success')});
	} catch(error) {
		next(error);
	}
}