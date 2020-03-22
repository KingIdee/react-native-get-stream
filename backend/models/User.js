const mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
  firstName: {type: String, required: true, index: true},
  lastName: {type: String, required: true, index: true},
  email: {type: String, unique: true, required: true, dropDups: true},
  username: {type: String, unique: true, required: true, dropDups: true},
  password: {type: String, required: true},
  phoneNumber: {index: true, type: String},
  avatar: String,
  refreshToken: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

UserSchema.methods.toJSON = function() {
  var user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  delete user.__v;
  return user;
 }

let User = mongoose.model("User", UserSchema);

module.exports = User;
