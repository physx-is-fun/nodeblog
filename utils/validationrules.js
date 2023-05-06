const joi = require('@hapi/joi');

exports.schema1 = joi.object({
							email: joi.string()
									   .email()
									   .min(5)
									   .max(25)
									   .required()
									   .messages({
										    "string.base": "Email should be a type of text!",
										    "string.empty": "Email cannot be an empty field!",
										    "string.min": `Email should have a minimum length of {#limit}!`,
										    "string.max": `Email should have a maximum length of {#limit}!`,
										    "any.required": "Email is a required field!",
										    "string.email": "Invalid email format!"
										}),
							password: joi.string()
									    .min(5)
									    .max(30)
									    .required()
									    .pattern(new RegExp(/(?=.*?[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])/))
									    .messages({
											"string.base": "Password should be a type of text!",
											"string.empty": "Password cannot be an empty field!",
											"string.min": `Password should have a minimum length of {#limit}!`,
											"string.max": `Password should have a maximum length of {#limit}!`,
											"any.required": "Password is a required field!",
											"string.pattern.base": "Password should contain at least 1 digit, 1 upper case letter, 1 lower case letter and 1 special character!"
										}),
							_csrf: joi.string()
									    .required()
									    .messages({
										    "string.base": "_csrf should be a type of text!",
										    "any.required": "_csrf is a required field!"
										})
});

exports.schema2 = joi.object({
							username: joi.string()
									    .min(5)
									    .max(25)
									    .required()
									    .messages({
										    "string.base": "Username should be a type of text!",
										    "string.empty": "Username cannot be an empty field!",
										    "string.min": `Username should have a minimum length of {#limit}!`,
										    "string.max": `Username should have a maximum length of {#limit}!`,
										    "any.required": "Username is a required field!"
										}),
							email: joi.string()
									    .email()
									    .min(5)
									    .max(25)
									    .required()
									    .messages({
										    "string.base": "Email should be a type of text!",
										    "string.empty": "Email cannot be an empty field!",
										    "string.min": `Email should have a minimum length of {#limit}!`,
										    "string.max": `Email should have a maximum length of {#limit}!`,
										    "any.required": "Email is a required field!",
										    "string.email": "Invalid email format!"
										}),
							password: joi.string()
										.min(5)
										.max(30)
										.required()
										.pattern(new RegExp(/(?=.*?[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])/))
										.messages({
										    "string.base": "Password should be a type of text!",
										    "string.empty": "Password cannot be an empty field!",
										    "string.min": `Password should have a minimum length of {#limit}!`,
										    "string.max": `Password should have a maximum length of {#limit}!`,
										    "any.required": "Password is a required field!",
										    "string.pattern.base": "Password should contain at least 1 digit, 1 upper case letter, 1 lower case letter and 1 special character!"
										}),
							confirmPassword: joi.string().required().valid(joi.ref('password'))
										.messages({
											"string.base": "ConfirmPassword should be a type of text!",
										    "any.required": "ConfirmPassword is a required field!",
											"any.only": "Password do not match!"
										}),
							_csrf: joi.string()
									    .required()
									    .messages({
										    "string.base": "_csrf should be a type of text!",
										    "any.required": "_csrf is a required field!"
										})
});