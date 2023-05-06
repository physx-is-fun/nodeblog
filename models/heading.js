const mongoose = require("./../db/db");

const headingSchema = new mongoose.Schema({ 
	name: { type: String, required: true, unique: true },
	author: { type: mongoose.Schema.Types.ObjectId, ref:'users' }
	}, 
	{ timestamps: true }
);

module.exports = mongoose.model('Heading',headingSchema);