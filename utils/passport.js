const config = require('./../config/config');
//const User = require('../models/user');
const userQueries = require('./userqueries');
const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const  sendMail = require('./gmail');

// Serialize User

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// DeserializeUser

passport.deserializeUser(async (id, done) => {
	try {
		let user = await userQueries.findById(id).exec();
		if (!user) {
			//req.flash('danger',['User not found!']);
			return done(null, false,['User not found!']);
		} else {
			done(null, user);
		}
	} catch (error) {
		done(error);
	}
});

// Local signin

const localSigninConfig = new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, 
	async function (req, email, password, done) {
		try {
			let user = await userQueries.findOne({ email: email }).exec();
			if (!user) {
				req.flash('danger', [`Your account with that ${email} email address is not found!`]);
				return done(null, false);	
			}
			if (!user.emailVerified) {
				req.flash('danger', [`Your account associated with that ${email} email address is not verified!`]);
				return done(null, false);
			}
			if (!user.password) {
				req.flash('danger', ['Your account was registered using a sign-in provider! To enable password login, sign in using a provider, and then set a password under your user profile!']);
				return done(null, false);
			}
			let isMatch = await user.validPassword(password);
			if (isMatch) {
				return done(null, user);	
			}
			req.flash('danger', ['Invalid email or password!']);
			return done(null, false);
		} catch(error){
			return done(error);
		}
})

// Local signup

const localSignupConfig = new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, 
	async function (req, email, password, done) {
		try {
			if(req.user){
				let userFoundByEmail = await userQueries.findOne({ email: email }).exec();
				if (userFoundByEmail && (userFoundByEmail._id != req.user._id)) {
					req.flash('danger', [`There is already a local account with ${email} email address that belongs to you! Sign in with that account or delete it, then link it with your current account!`]);
					return done(null, false);
				}
				let userFoundById = req.user;
				userFoundById.username = userFoundById.username || req.body.username;
				userFoundById.email = email;
				userFoundById.password = password;
				userFoundById.emailVerified = false;
				await userFoundById.save();
				let token = jwt.sign({user: userFoundById._id}, config.jwtsecret, { expiresIn: '6h' });
				const to = email;
				const subject = 'Signup to Myblog';
				const outputHTML = `You are receiving this email because you (or someone else) have requested signup.\n\n
				Please click on the following link, or paste this into your browser to complete the process:\n\n
				${req.protocol}://${req.headers.host}/verifyemail/${token}\n\n
				If you did not request this, please ignore this email and your password will remain unchanged.\n`;
				const options = {
					to: to,
					subject: subject,
					html: outputHTML
				};
				let info = await sendMail(options);
				req.flash('success', ['An e-mail has been sent successfully with further instructions!']);
				return done(null, false);
			} else {
				let anotherUserFoundByEmail = await userQueries.findOne({ email: email }).exec();
				if (anotherUserFoundByEmail) {
					req.flash('danger', [`Account with that ${email} email address is already exists!`]);
					return done(null, false);
				}
				let newUser = userQueries.newUser();
				newUser.username = req.body.username;
				newUser.email = email;
				newUser.password = password;
				newUser.emailVerified = false;
				await newUser.save();
				let token = jwt.sign({user: newUser._id}, config.jwtsecret, { expiresIn: '6h' });
				const to = email;
				const subject = 'Signup to Myblog';
				const outputHTML = `You are receiving this email because you (or someone else) have requested signup.\n\n
				Please click on the following link, or paste this into your browser to complete the process:\n\n
				${req.protocol}://${req.headers.host}/verifyemail/${token}\n\n
				If you did not request this, please ignore this email and your password will remain unchanged.\n`;
				const options = {
					to: to,
					subject: subject,
					html: outputHTML
				};
				let info = await sendMail(options);
				req.flash('success', ['An e-mail has been sent successfully with further instructions!']);
				return done(null, false);
			}	
		} catch(error) {
			return done(error);
		}
})

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

// Google signin

const googleStrategyConfig = new GoogleStrategy(
	config.googleStrategy, 
	async function (req, accessToken, refreshToken, params, profile, done) {
		try{
			if(req.user){
				let userFoundByGoogle = await userQueries.findOne({ google: profile.id }).exec();
				if(userFoundByGoogle && (userFoundByGoogle._id != req.user._id)){
					req.flash('danger', ['There is already a Google account that belongs to you! Sign in with that account or delete it, then link it with your current account!']);
					return done(null, false);
				}
				let userFoundById = req.user;
				userFoundById.google = profile.id;
				userFoundById.username = userFoundById.username || profile.displayName || '';
				userFoundById.picture = userFoundById.picture || profile.photos[0].value || '';
				userFoundById.gender = userFoundById.gender || profile._json.gender || '';
				userFoundById.localization = userFoundById.localization || profile._json.locale || '';
				userFoundById.tokens.push({
											kind: 'google',
											accessToken,
											accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
											refreshToken
				});
				await userFoundById.save();
				req.flash('success', ['Google account has been linked successfully!']);
				return done(null, userFoundById);
			} else {
				let anotherUserFoundByGoogle = await userQueries.findOne({ google: profile.id }).exec();
				if(anotherUserFoundByGoogle){
					return done(null, anotherUserFoundByGoogle);
				}
				let newUser = userQueries.newUser();
				newUser.google = profile.id;
				newUser.username = profile.displayName || '';
				newUser.picture = profile.photos[0].value || '';
				newUser.gender = profile._json.gender || '';
				newUser.localization = profile._json.locale || '';
				newUser.tokens.push({
					kind: 'google',
					accessToken,
					accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
					refreshToken,
				});
				await newUser.save();
				return done(null, newUser);
			}
		} catch(error){
			return done(error);
		}
});

// Facebook signin

const facebookStrategyConfig = new FacebookStrategy(
	config.facebookStrategy, 
	async function (req, accessToken, refreshToken, profile, done) {
		try{
			if(req.user){
				let userFoundByFacebook = await userQueries.findOne({ facebook: profile.id }).exec();
				if(userFoundByFacebook && (userFoundByFacebook._id != req.user._id)){
					req.flash('danger', ['There is already a Facebook account that belongs to you! Sign in with that account or delete it, then link it with your current account!']);
					return done(null, false);
				}
				let userFoundById = req.user;
				userFoundById.facebook = profile.id;
				userFoundById.username = userFoundById.username || `${profile.name.givenName} ${profile.name.familyName}` || '';
				userFoundById.picture = userFoundById.picture || profile.photos[0].value || '';
				userFoundById.gender = userFoundById.gender || profile.gender || '';
				userFoundById.localization = userFoundById.localization || profile.locale || '';
				userFoundById.tokens.push({ 
											kind: 'facebook', 
											accessToken 
				});
				await userFoundById.save();
				req.flash('success', ['Facebook account has been linked successfully!']);
				return done(null, userFoundById);
			} else {
				let anotherUserFoundByFacebook = await userQueries.findOne({ facebook: profile.id }).exec();
				if(anotherUserFoundByFacebook){
					return done(null, anotherUserFoundByFacebook);
				}
				let newUser = userQueries.newUser();
				newUser.facebook = profile.id;
				newUser.username = `${profile.name.givenName} ${profile.name.familyName}` || '';
				newUser.picture = profile.photos[0].value || '';
				newUser.gender = profile.gender || '';
				newUser.localization || profile.locale || '';
				newUser.tokens.push({ 
										kind: 'facebook', 
										accessToken 
				});	
			}
		} catch(error){
			return done(error);
		}
});
 
 /*
const facebookStrategyConfig = new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
  profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'gender'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    User.findOne({ facebook: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken });
          user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.save((err) => {
            req.flash('info', { msg: 'Facebook account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ facebook: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
          done(err);
        } else {
          const user = new User();
          user.email = profile._json.email;
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken });
          user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
          user.profile.gender = profile._json.gender;
          user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.profile.location = (profile._json.location) ? profile._json.location.name : '';
          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }
});
*/

passport.use('local.signin', localSigninConfig);
passport.use('local.signup',localSignupConfig);
passport.use('google', googleStrategyConfig);
refresh.use('google', googleStrategyConfig);
passport.use('facebook', facebookStrategyConfig);
refresh.use('facebook', facebookStrategyConfig);