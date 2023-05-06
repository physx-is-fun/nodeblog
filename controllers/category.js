const config = require('./../config/config');
const path = require('path');
const { pagination } = require('./../utils/pagination');
const postQueries = require('./../utils/postqueries');
const categoryQueries = require('./../utils/categoryqueries');

exports.postCategory = async (req, res, next) => {
	try {
		let category = await categoryQueries.findOne({name: req.body.name}).exec();
		if(category){
			req.flash('danger',[`Field name with value ${req.body.name} has already been taken!`]);
			res.status(302).redirect(`/${req.body.path}/categories`);
		} else {
			await categoryQueries.create({name: req.body.name, author: req.user.id});
			req.flash('success',['Category has been created successfully!']);
			res.status(302).redirect(`/${req.body.path}/categories`);
		}
	} catch(error){
		next(error);
	}
}

exports.updateCategory = async (req, res, next) => {
	try {
		let category = await categoryQueries.findOne({ _id: req.params.id}).exec();
		if(category){
			category.name = req.body.name;
			await category.save();
			req.flash('success',['Category has been updated successfully!']);
			res.status(201).send({status: true});
		} else {
			req.flash('danger',['Sorry, the category cannot be found!']);
			res.status(201).send({status: true});
		}
	} catch(error){
		next(error);
	}
}

exports.deleteCategory = async (req, res, next) => {
	try {
		await categoryQueries.deleteOne({_id: req.params.id});
		req.flash('success',['Category has been deleted successfully!']);
		res.status(201).send({status: true});
	} catch (error){
		next(error);
	}
}