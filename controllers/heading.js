const config = require('./../config/config');
const path = require('path');
const { pagination } = require('./../utils/pagination');
const postQueries = require('./../utils/postqueries');
const headingQueries = require('./../utils/headingqueries');

exports.postHeading = async (req, res, next) => {
	try {
		let heading = await headingQueries.findOne({name: req.body.name}).exec();
		if(heading){
			req.flash('danger',[`Field name with value ${req.body.name} has already been taken!`]);
			res.status(302).redirect(`/${req.body.path}/headings`);
		} else {
			await headingQueries.create({name: req.body.name, author: req.user.id});
			req.flash('success',['Heading has been created successfully!']);
			res.status(302).redirect(`/${req.body.path}/headings`);
		}
	} catch(error){
		next(error);
	}
}

exports.updateHeading = async (req, res, next) => {
	try {
		let heading = await headingQueries.findOne({ _id: req.params.id}).exec();
		if(heading){
			heading.name = req.body.name;
			await heading.save();
			req.flash('success',['Heading has been updated successfully!']);
			res.status(201).send({status: true});
		} else {
			req.flash('danger',['Sorry, the heading cannot be found!']);
			res.status(201).send({status: true});
		}
	} catch(error){
		next(error);
	}
}

exports.deleteHeading = async (req, res, next) => {
	try {
		await headingQueries.deleteOne({_id: req.params.id});
		req.flash('success',['Heading has been deleted successfully!']);
		res.status(201).send({status: true});
	} catch (error){
		next(error);
	}
}