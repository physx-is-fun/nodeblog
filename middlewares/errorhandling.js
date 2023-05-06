const { unique } = require('./../utils/mongooseerrorhandler');
const { CastError } = require('mongoose');
/*
		if(error.code == 11000 && error.name == 'MongoError'){
			req.flash('danger',unique(error));
			res.status(500).redirect('/admin/categories');
		} else {
			next(error);
		}
*/

exports.notFound = (req, res, next) => {
	res.status(404).render('site/main/error',{errorCode: '404', errorMessage: 'Page not found!', danger: req.flash('danger'), success: req.flash('success')});
}

exports.csrfErrors = (error, req, res, next) => {
	console.log(error);
	if (error.code !== 'EBADCSRFTOKEN') return next(error);
	res.status(403).render('site/main/error',{errorCode: '403', errorMessage: 'Form tampered with!', danger: req.flash('danger'), success: req.flash('success')});
}

exports.setHeaderErrors = function (req, res, next){
    const render = res.render;
    const send = res.send;
    res.render = function renderWrapper(...args) {
        Error.captureStackTrace(this);
        return render.apply(this, args);
    };
    res.send = function sendWrapper(...args) {
        try {
            send.apply(this, args);
        } catch (err) {
            console.error(`Error in res.send | ${err.code} | ${err.message} | ${res.stack}`);
        }
    };
    next();
}

exports.developmentErrors = (error, req, res, next) => {
    console.log(error);
	res.status(error.status || 500).send({
        message: error.message,
        error  : error
    });
}

exports.productionErrors = (error, req, res, next) => {
	console.log(error);
	let messages = null;
	if(error.name == 'MongoError'){
		switch(error.code) {
			case 11000:
				messages = unique(error);
				break;
			default:
				messages = null;
		}
		req.flash('danger',messages);
		res.status(500).render('site/main/error',{errorCode: '500', errorMessage: 'Database error!', danger: req.flash('danger'), success: req.flash('success')});
		return
	}
	if(error.name == 'TokenExpiredError'){
		messages = ['The token associated with the verification link is expired! Please resubmit your request in order to get a new valid verification link!'];
		req.flash('danger',messages);
		res.status(500).render('site/main/error',{errorCode: '500', errorMessage: 'Database error!',danger: req.flash('danger'), success: req.flash('success')});
		return
	}
	if(error instanceof CastError){
		messages = ['Invalid ID!'];
		req.flash('danger',messages);
		res.status(500).render('site/main/error',{errorCode: '500', errorMessage: 'Database error!',danger: req.flash('danger'), success: req.flash('success')});
		return
	}
	res.status(500).render('site/main/error',{errorCode: '500', errorMessage: 'Internal server error!',danger: req.flash('danger'), success: req.flash('success')});
}
