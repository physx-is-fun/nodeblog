const User = require('../models/user');

exports.findById = (id) => {
	let userQuery = User.findById(id);
	return userQuery;	
};

exports.findOne = (email) => {
	let userQuery = User.findOne(email);
	return userQuery;
};

exports.newUser = () => {
	let user = new User();
	return	user;
};

exports.deleteOne = async (id) => {
	try {
		await User.deleteOne(id).exec();
	} catch(error){
		return error;
	}	
};