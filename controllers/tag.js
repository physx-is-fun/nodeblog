const config = require('./../config/config');
const path = require('path');
const { pagination } = require('./../utils/pagination');
const postQueries = require('./../utils/postqueries');
const tagQueries = require('./../utils/tagqueries');

exports.postTag = async (req, res, next) => {
	try {
		let tag = await tagQueries.findOne({name: req.body.name}).exec();
		if(tag){
			req.flash('danger',[`Field name with value ${req.body.name} has already been taken!`]);
			res.status(302).redirect(`/${req.body.path}/tags`);
		} else {
			await tagQueries.create({name: req.body.name, author: req.user.id});
			req.flash('success',['Tag has been created successfully!']);
			res.status(302).redirect(`/${req.body.path}/tags`);
		}
	} catch(error){
		next(error);
	}
}

exports.updateTag = async (req, res, next) => {
	try {
		let tag = await tagQueries.findOne({ _id: req.params.id}).exec();
		if(tag){
			tag.name = req.body.name;
			await tag.save();
			req.flash('success',['Tag has been updated successfully!']);
			res.status(201).send({status: true});
		} else {
			req.flash('danger',['Sorry, the tag cannot be found!']);
			res.status(201).send({status: true});
		}
	} catch(error){
		next(error);
	}
}

exports.deleteTag = async (req, res, next) => {
	try {
		await tagQueries.deleteOne({_id: req.params.id});
		req.flash('success',['Tag has been deleted successfully!']);
		res.status(201).send({status: true});
	} catch (error){
		next(error);
	}
}