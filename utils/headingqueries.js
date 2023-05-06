const Heading = require('../models/heading');
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
	let HeadingQuery = Heading.find(search_query,projection).populate(populate).sort(sort);
	return HeadingQuery;	
};

exports.findOne = (id) => {
	let HeadingQuery = Heading.findOne(id);
	return HeadingQuery;	
};

exports.deleteOne = async (id) => {
	try {
		await Heading.deleteOne(id).exec();
	} catch(error){
		return error;
	}	
};

exports.create = (heading) => {
	return Heading.create(heading);	
};

exports.adminFindAll = (query) => {
	let search_query = escapeRegex(query.search_query ? query.search_query : "")
	search_query = search_query ? {"name": search_query} : {};
	let populate = {"path": "author", "model": "User", "select": {"username": 1, "_id": 0}};
	let projection = {"updatedAt": 0};
	let sort = {"createdAt": -1};
	let HeadingQuery = Heading.find(search_query,projection).populate(populate).sort(sort);
	return HeadingQuery;	
};

exports.postsFindAll = () => {
	let HeadingQuery = Heading.aggregate([
		{
			$lookup: {
				from: 'posts',
				localField: '_id',
				foreignField: 'Heading',
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
	return HeadingQuery;	
};

exports.findAll = () => {
	let HeadingQuery = Heading.find({});
	return HeadingQuery;	
};