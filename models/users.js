const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  avatarURL: String,
  username: String,
  accessToken: String,
  refreshToken: String,
  user_ip: String,
  user_country: String,
});

const model = mongoose.model("users", userSchema);

module.exports = model;