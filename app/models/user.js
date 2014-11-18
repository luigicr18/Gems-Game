var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  user: {
  username     : String,
  email        : { type: String, required: true, unique: true },
  password     : String,
  address      : String,
  bestscore    : { type:Number, default: 0 },
  isAvailable  : { type:Boolean, default: true}
  }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.user.password);
};

userSchema.methods.updateUser = function(request, response){
	this.user.name = request.body.name;
	this.user.address = request.body.address;
	this.user.save();
	response.redirect('/user');
};

userSchema.methods.updateUserScore = function(currentScore){
  if ( this.user.bestscore < currentScore || this.user.bestscore === null ) {
    this.user.bestscore = currentScore;
    this.user.save();
  };

};

module.exports = mongoose.model('User', userSchema);