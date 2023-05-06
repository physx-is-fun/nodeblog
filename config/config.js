const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const config = {
	development: {
		sessionName: process.env.SESSIONNAME,
		sessionSecret: process.env.SESSIONSECRET,
		database: process.env.DEV_DATABASE,
		jwtsecret: process.env.JWTSECRET,
		server: {
			host: process.env.DEV_HOST,
			port: process.env.DEV_PORT,
			cors: {  
				origin: process.env.DEV_ORIGIN,
				methods: ["GET", "POST","PUT","DELETE","PATCH"],
				credentials: true
			}
		},
		nodemailer: {
			user: process.env.NODEMAILER_USER,
			pass: process.env.NODEMAILER_PASS
		},
		googleStrategy: {
			clientID: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: '/auth/google/callback',
			passReqToCallback: true
		},
		facebookStrategy: {
			clientID: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
			callbackURL: `${process.env.DEV_ORIGIN}/auth/facebook/callback`,
			profileFields: ['id', 'name', 'email', 'link', 'locale', 'timezone', 'gender', 'photos', 'displayName'],
			passReqToCallback: true
		}
	},
	production: {
		sessionName: process.env.SESSIONNAME,
		sessionSecret: process.env.SESSIONSECRET,
		database: process.env.PROD_DATABASE,
		jwtsecret: process.env.JWTSECRET,
		server: {
			host: process.env.PROD_HOST,
			port: process.env.PROD_PORT,
			cors: {  
				origin: process.env.DEV_PROD,
				methods: ["GET", "POST","PUT","DELETE","PATCH"],
				credentials: true
			}
		},
		nodemailer: {
			user: process.env.NODEMAILER_USER,
			pass: process.env.NODEMAILER_PASS
		},
		googleStrategy: {
			clientID: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: '/auth/google/callback',
			passReqToCallback: true
		},
		facebookStrategy: {
			clientID: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
			callbackURL: `${process.env.DEV_ORIGIN}/auth/facebook/callback`,
			profileFields: ['id', 'name', 'email', 'link', 'locale', 'timezone', 'gender', 'photos', 'displayName'],
			passReqToCallback: true
		}
	}
}

module.exports = config[process.env.NODE_ENV]