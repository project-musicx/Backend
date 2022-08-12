const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  profileUrl: String,
  email: String,
  googleId: String,
  connectedAccounts: [
    {
      accountType: String,
      token: String,
    },
  ],
});

const User = mongoose.model("authUsers", userSchema);
module.exports = User;
