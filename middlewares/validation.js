exports.validation = (schema) => {
	return (req, res, next) => {
		let { error } = schema.validate(req.body,{ abortEarly: false });					
		let extractedErrors = [];
		if(error){
			error.details.forEach(v => extractedErrors.push(v.message));
			req.flash('danger',extractedErrors);
			res.status(302).redirect(req.baseUrl + req.path);
		} else {
			next();
		}
	}
}