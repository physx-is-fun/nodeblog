const mongoose = require("./../db/db");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
	isAdmin: { type: Boolean, default: false },
	username: { type: String, default: '' },
	gender: { type: String, default: '' },
	localization: { type: String, default: '' },
	picture: { type: String, default: '' },
	email: { type: String, default: '', unique: true },
	password: { type: String, default: '' },
	emailVerified: { type: Boolean, default: false },
	facebook: { type: String, default: '' },
	google: { type: String, default: '' },
	tokens: { type: Array, default: [] }
}, { timestamps: true});

userSchema.pre('save', async function(next) {
	try {
		if (!this.isModified('password')){ return next(); }
		const salt = await bcrypt.genSalt(saltRounds);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch(error) {
		next(error);
	}
});

userSchema.methods.validPassword = async function(password) {
  try {
	  return await bcrypt.compare(password, this.password);
  } catch(error){
	  return error;
  } 
};

userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 20;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

module.exports = mongoose.model('User',userSchema);