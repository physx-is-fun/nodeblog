const Post = require('../models/post');
const { escapeRegex } = require('./escaperegex');
var { ObjectId } = require('mongodb');

exports.userFindAll = (query,user_id) => {
	let userId = user_id.toString();
	userId = new ObjectId(userId);
	let search_query = { 
		title: escapeRegex(query.search_query ? query.search_query : ""), 
		author: userId 
	};
	let projection = {"title": 1, "createdAt": 1};
	let sort = {"createdAt": -1};
	//let populate1 = {path: "category", model: "Category", "select": {"name": 1, "_id": 0}};
	let populate2 = {path: "author", model: "User", "select": {"username": 1, "_id": 0}};
	let postQuery = Post.find(search_query,projection).populate([/*populate1,*/populate2]).sort(sort);
	return postQuery;
};

exports.findAll = (query) => {
	let search_query = {
		title: escapeRegex(query.search_query ? query.search_query : ""),
		...(query.category ? { category: new ObjectId(query.category) } : {}),
		...(query.heading ? { heading: new ObjectId(query.heading) } : {})
	};
	let projection = {"createdAt": 1, "_id": 1, "title": 1, "post_image": 1, "intro": 1};
	let sort = {"createdAt": -1};
	let populate1 = {"path": "author", "model": "User", "select": {"username": 1, "_id": 0}};
	let populate2 = {"path": "category", "model": "Category", "select": {"name": 1, "_id": 0}};
	let populate3 = {"path": "heading", "model": "Heading", "select": {"name": 1, "_id": 0}};
	let postQuery = Post.find(search_query,projection).populate([populate1,populate2,populate3]).sort(sort);
	return postQuery;
};

exports.latestFindAll = () => {
	let projection = {"createdAt": 1, "_id": 1, "title": 1, "post_image": 1};
	let sort = {"createdAt": -1};
	let postQuery = Post.find({},projection).sort(sort).limit(3);
	return postQuery;	
};

exports.adminFindAll = (query) => {
	let search_query = { 
		title: escapeRegex(query.search_query ? query.search_query : "")
	};	
	let projection = {"title": 1, "createdAt": 1};
	let sort = {"createdAt": -1};
	//let populate1 = {path: "category", model: "Category", "select": {"name": 1, "_id": 0}};
	let populate2 = {path: "author", model: "User", "select": {"username": 1, "_id": 0}};
	let postQuery = Post.find(search_query,projection).populate([/*populate1,*/populate2]).sort(sort);
	return postQuery;
};

exports.findById = (id) => {
	let populate1 = {"path": "author", "model": "User", "select": {"username": 1, "_id": 0}};
	let populate2 = {"path": "category", "model": "Category", "select": {"name": 1, "_id": 0}};
	let populate3 = {"path": "heading", "model": "Heading", "select": {"name": 1, "_id": 0}};
	let postQuery = Post.findById(id).populate([populate1,populate2,populate3]);
	return postQuery;	
};

exports.create = async (post) => {
	try {
		await Post.create(post);
	} catch(error){
		return error;
	}	
};

exports.findOne = (id) => {
	let postQuery = Post.findOne(id);
	return postQuery;
};

exports.deleteOne = async (id) => {
	try {
		await Post.deleteOne(id).exec();
	} catch(error){
		return error;
	}	
};

exports.categoryFindAll = (search_query) => {
	let projection = {"createdAt": 1, "_id": 1, "title": 1, "post_image": 1};
	let sort = {"createdAt": -1};
	let populate1 = {"path": "author", "model": "User", "select": {"username": 1, "_id": 0}};
	let populate2 = {"path": "category", "model": "Category", "select": {"name": 1, "_id": 0}};
	let postQuery = Post.find(search_query,projection).populate([populate1,populate2]).sort(sort);
	return postQuery;	
};