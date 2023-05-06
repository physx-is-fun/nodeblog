exports.validateBody = (data,schema) => {
	let { error } = schema.validate(data,{ abortEarly: false });					
	let extractedErrors = [];
	if(error){
		error.details.forEach(v => extractedErrors.push(v.message));
	};
	return extractedErrors;	
};