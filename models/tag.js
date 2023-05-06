const mongoose = require("./../db/db");

const tagSchema = new mongoose.Schema({ 
	name: { type: String, required: true, unique: true },
	author: { type: mongoose.Schema.Types.ObjectId, ref:'users' }
	}, 
	{ timestamps: true }
);

module.exports = mongoose.model('Tag',tagSchema);