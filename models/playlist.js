const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  playlistName: String,
  createrId: String,
  numberOfsounds: Number,
  isPrivate: Boolean,
  platform: String,
  collaborative:Boolean,
  playListUrl:String,
  images:[String]
});

const Playlist = mongoose.model("playlists", userSchema);
module.exports = Playlist;
