exports.authentication = (req, res, next) => {
	if(req.isAuthenticated()) {
		return next();
	} else {
		req.flash('danger',['Unauthenticated, please login!']);
		return res.status(401).redirect('/login');
	}
};