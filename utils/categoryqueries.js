const Category = require('../models/category');
const { escapeRegex } = require('./escaperegex');
var { ObjectId } = require('mongodb');

exports.userFindAll = (query,user_id) => {
	let userId = user_id.toString();
	userId = new ObjectId(userId);
	let search_query = escapeRegex(query.search_query ? query.search_query : "")
	search_query = search_query ? {"name": search_query, "author": userId } : { "author": userId };
	let populate = {"path": "author", "model": "User", "select": {"username": 1, "_id": 0}};
	let projection = {"updatedAt": 0};
	let sort = {"createdAt": -1};
	let categoryQuery = Category.find(search_query,projection).populate(populate).sort(sort);
	return categoryQuery;	
};

exports.findOne = (id) => {
	let categoryQuery = Category.findOne(id);
	return categoryQuery;	
};

exports.deleteOne = async (id) => {
	try {
		await Category.deleteOne(id).exec();
	} catch(error){
		return error;
	}	
};

exports.create = (category) => {
	return Category.create(category);	
};

exports.adminFindAll = (query) => {
	let searchquery = escapeRegex(query.search_query ? query.search_query : "")
	searchquery = searchquery ? {"name": searchquery} : {};
	let populate = {"path": "author", "model": "User", "select": {"username": 1, "_id": 0}};
	let projection = {"updatedAt": 0};
	let sort = {"createdAt": -1};
	let categoryQuery = Category.find(searchquery,projection).populate(populate).sort(sort);
	return categoryQuery;	
};

exports.postsFindAll = () => {
	let categoryQuery = Category.aggregate([
		{
			$lookup: {
				from: 'posts',
				localField: '_id',
				foreignField: 'category',
				as: 'posts'
			}
		},
		{
			$project: {
				_id: 1,
				name: 1,
				num_of_posts: {$size: '$posts'}
			}
		}
	]);
	return categoryQuery;	
};

exports.findAll = () => {
	let categoryQuery = Category.find({});
	return categoryQuery;	
};