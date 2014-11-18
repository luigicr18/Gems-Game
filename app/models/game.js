var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    userEmail: String,
    currentScore: { type: Number, default: 0 }
});

gameSchema.methods.createNewGame = function(user){
  this.userEmail = user.email;
  this.save();
  return this;
};

module.exports = mongoose.model('Game', gameSchema);