const mongoose = require("./../db/db");

const postSchema = new mongoose.Schema({
	title: { type: String, required: true },
	author: { type: mongoose.ObjectId, ref:'users' },
	intro: { type: String, required: true },
	content: { type: String, required: true },
	category: { type: mongoose.Schema.Types.ObjectId, ref:'categories' },
	heading: { type: mongoose.Schema.Types.ObjectId, ref:'headings' },
	post_image: { type: String, required: true }
	}, 
	{ timestamps: true }
);

module.exports = mongoose.model('Post',postSchema)