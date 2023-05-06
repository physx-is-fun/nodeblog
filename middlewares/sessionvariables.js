exports.sessionVariables = (req, res, next) => {
	//res.locals.session = req.session;
	//res.locals.isAuthenticated = req.isAuthenticated();
	res.locals.user = req.user;
	res.locals.csrfToken = req.csrfToken();
	//res.locals.flashMessages = req.session.flashMessages;
	//req.session.flashMessages = { type: 'info', messages: [] };
	//res.locals.navbarItems = req.session.navbarItems;
	next();
};