// token.js

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const credentials = require('./credentials.json');
// The code you received from Google
const { code } = require('./google authorization code.json');
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const token = async () => {
	try {
		const tokens = await oAuth2Client.getToken(code);
		fs.writeFileSync(tokenPath, JSON.stringify(tokens));
		console.log('Access token and refresh token stored to token.json');
	} catch (error){
		console.log(error);
	}
};
token();
