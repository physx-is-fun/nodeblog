exports.redirect = (req, res, next) => {
	if (!req.user
		&& req.path != '/login'
		&& req.path != '/register'
		&& !req.path.match(/^\/auth/)
		&& !req.path.match(/\./)) {
		req.session.returnTo = req.originalUrl;
	} else if (req.user
		&& (req.path.match(/^\/account/))) {
		req.session.returnTo = req.originalUrl;
	}
	next();
};