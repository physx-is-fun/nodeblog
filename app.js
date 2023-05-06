// Import dependencies.
const path = require('path');
const config = require('./config/config');
const db = require('./db/db');
const handlebarsHelpers = require('./utils/handlebarshelpers');
const developmentErrors = require('errorhandler');
const errorHandler = require('./middlewares/errorhandling');
const { sessionVariables } = require('./middlewares/sessionvariables');
const { redirect } = require('./middlewares/redirect');
const express = require('express');
const Handlebars = require('handlebars');
const exphbs  = require('express-handlebars');
//This package allows you to create a new Handlebars instance, that behaves like version 4.5.3 and allows access to the prototype
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require("compression");
const helmet = require('helmet');
const morgan = require("morgan");
const cookieparser = require('cookie-parser');
const session = require('express-session');
const mongostore = require('connect-mongo')(session);
const passport = require('passport');
const hpp = require('hpp');
const fileupload = require('express-fileupload');
const moment = require('moment');
const flash = require('connect-flash');
const csrf = require('csurf');
const app = express();
// Import Passport stategies
require('./utils/passport');

// HTTP request logger middleware for Node.js.
if (process.env.NODE_ENV == "development") {
	app.use(morgan("dev"));
} else {
	app.use(morgan("common"));
};

// Helmet helps you secure your Express apps by setting various HTTP headers.
//app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

//Express middleware to protect against HTTP Parameter Pollution attacks.
app.use(hpp());

// Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.
app.use(cors(config.server.cors));

// The compression middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options.
app.use(compression());

// Takes the raw requests and turns them into usable properties on req.body.
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '4mb'
}));

app.use(bodyParser.json());

// Populates req.cookies with any cookies that came along with the request.
app.use(cookieparser());

// Sessions allow us to store data on visitors from request to request. This keeps users logged in and allows us to send flash messages.
app.use(session({
	name: config.sessionName,
	secret: config.sessionSecret,
	resave: false, // (false) Don't save session if unmodified.
	saveUninitialized: false, // (false) Don't create session until something stored.
	unset: "destroy",
	store: new mongostore({ mongooseConnection: db.connection }),
	cookie: {
      httpOnly: false, 
      secure: false, 
      maxAge: 8 * 60 * 60 * 1000 // 8 hour
	}
}));

// The flash middleware let's us use req.flash('error', 'Something terrible happened!'), which will then pass that message to the next page the user requests.
app.use(flash());

// Node.js CSRF protection middleware.
app.use(csrf());

// Init passport authentication.
app.use(passport.initialize());

// Persistent login session.
app.use(passport.session());

// Simple express middleware for uploading files.
app.use(fileupload());

// Serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static('public'));

// View engine setup.
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: '.handlebars',
  helpers: handlebarsHelpers,
  partialsDir: "./views/partials/",
  layoutsDir: "./views/layouts/",
  // ...implement newly added insecure prototype access
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Session variables for handlebar templates.
app.use(sessionVariables);

// After successful login, redirect back to the intended page
app.use(redirect);

// Handling routes.
app.use('/', require('./routes/main'));
app.use('/posts', require('./routes/post'));
app.use('/categories', require('./routes/category'));
app.use('/headings', require('./routes/heading'));
app.use('/tags', require('./routes/tag'));
app.use('/account', require('./routes/account'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

// If that above routes didnt work, we 404 them and forward to error handler.
app.use(errorHandler.notFound);

// CSRF token error handler.
app.use(errorHandler.csrfErrors);

// Error handling.
if (process.env.NODE_ENV == 'development') {
	// Development error handler: it will print stacktrace.
	app.use(developmentErrors());
} else {
	// Production error handler: no stacktraces leaked to user.
	app.use(errorHandler.productionErrors);
}

// We export the app so we can start the application in server.js.
module.exports = app;