exports.authorization = (req, res, next) => {
	if(req.user.isAdmin) {
		return next();
	} else {
		req.flash('danger',['Unauthorized, you do not have premission!']);
		return res.status(401).redirect('/login');
	}
};