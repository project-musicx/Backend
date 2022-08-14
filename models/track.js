const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  height: Number,
  url: String,
  width: Number,
});

const albumSchema = new mongoose.Schema({
  album_type: String,
  href: String,
  id: String,
  images: [imageSchema],
  name: String,
  release_date: String,
  total_tracks: Number,
  type: String,
  uri: String,
});

const trackShema = new mongoose.Schema({
  tackName: String,
  createrId: String,
  platform: String,
  duration_ms: Number,
  album: albumSchema,
  href: String,
  songId: { type: String, unique: true, required: true },
  popularity: Number,
  preview_url: String,
  type: String,
  uri: String,
});

const Track = mongoose.model("tracks", trackShema);
module.exports = Track;
