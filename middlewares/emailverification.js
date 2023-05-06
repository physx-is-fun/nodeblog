exports.emailVerification = (req, res, next) => {
	if(user.emailVerified) {
		return next();
	} else {
		req.flash('danger',['Email is not verified!']);
		return res.status(401).redirect('/');
	}
};