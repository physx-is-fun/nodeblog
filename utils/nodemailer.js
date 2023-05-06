const config = require('./../config/config');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
						service: 'gmail',
						auth: config.nodemailer
});

exports.nodemailer = async (to, subject, html) => {
	try {
		const mailOptions = {
			from: config.nodemailer.user,
			to: to || '',
			subject: subject || '',
			html: html || ''
		};
		let info = await transporter.sendMail(mailOptions);
		return info
	} catch (error){
		return error;
	}
}