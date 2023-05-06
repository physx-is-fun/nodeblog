exports.unique = (error) => {
	let errorKeys = Object.keys(error.keyValue);
	let errorValues = Object.values(error.keyValue);
	let errorMessages = [];
	for (var i = 0; i < errorKeys.length; i++) {
		errorMessages.push(`Field ${errorKeys[i]} with value ${errorValues[i]} has already been taken!`);
	}
	return errorMessages;
};