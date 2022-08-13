const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  tackName: String,
  createrId: String,
  numberOfsounds: Number,
  isPrivate: Boolean,
  platform: String,
  duration_ms:Number,
  album:{
        album_type: String,
        href: String,
        id: String,
        images: [{
        url:String  
        }],
        name: String,
        release_date: String,
        total_tracks: Number,
        type: String,
        uri: String
  }, 
  href:String,
  songId:String,
  popularity:Number,
  preview_url:String,
  type:String,
  uri:String
});


const Track = mongoose.model("tracks", userSchema);
module.exports = Track;
