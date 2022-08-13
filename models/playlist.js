const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  playlistName: String,
  createrId: String,
  numberOfsounds: Number,
  isPrivate: Boolean,
  playListId:String,
  platform: String,
  collaborative: Boolean,
  playListUrl: String,
  description: String,
  images: [
    {
      height: Number,
      url: String,
      width: Number,
    },
  ],
});

const Playlist = mongoose.model("playlists", userSchema);
module.exports = Playlist;
