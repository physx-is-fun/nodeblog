const Tag = require('../models/tag');
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
	let TagQuery = Tag.find(search_query,projection).populate(populate).sort(sort);
	return TagQuery;	
};

exports.findOne = (id) => {
	let TagQuery = Tag.findOne(id);
	return TagQuery;	
};

exports.deleteOne = async (id) => {
	try {
		await Tag.deleteOne(id).exec();
	} catch(error){
		return error;
	}	
};

exports.create = (tag) => {
	return Tag.create(tag);	
};

exports.adminFindAll = (query) => {
	let search_query = escapeRegex(query.search_query ? query.search_query : "")
	search_query = search_query ? {"name": search_query} : {};
	let populate = {"path": "author", "model": "User", "select": {"username": 1, "_id": 0}};
	let projection = {"updatedAt": 0};
	let sort = {"createdAt": -1};
	let TagQuery = Tag.find(search_query,projection).populate(populate).sort(sort);
	return TagQuery;	
};

exports.postsFindAll = () => {
	let TagQuery = Tag.aggregate([
		{
			$lookup: {
				from: 'posts',
				localField: '_id',
				foreignField: 'Tag',
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
	return TagQuery;	
};

exports.findAll = () => {
	let TagQuery = Tag.find({});
	return TagQuery;	
};

