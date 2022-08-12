const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 tackName: String,
  createrId: String,
  numberOfsounds: Number,
  isPrivate: Boolean,
  platform: String,
});

const Playlist = mongoose.model("playlists", userSchema);
module.exports = Playlist;
