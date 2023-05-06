const mongoose = require("./../db/db");

const categorySchema = new mongoose.Schema({ 
	name: { type: String, required: true, unique: true },
	author: { type: mongoose.Schema.Types.ObjectId, ref:'users' }
	}, 
	{ timestamps: true }
);

module.exports = mongoose.model('Category',categorySchema);