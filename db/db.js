const config = require('./../config/config');
const mongoose = require("mongoose");

mongoose.connect(config.database, {
	useFindAndModify: false,
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('connected', () => console.log("Successful connection to the database"));
db.on('error', error => console.log("A database error has occured: " + error.name));
db.on('disconnected', () => console.log("The connection to the database has been terminated"));

module.exports = mongoose;