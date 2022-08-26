const express = require("express");
const PlaylistModel = require("../models/playlist");
const User = require("../models/user");
const addTracksToPlaylist = require("../spotifyApi/addTrackToPlaylist");
const refreshToken = require("../spotifyApi/refreshSpotifyToken");
const router = express.Router();
const getPlaylistTrack = require("../spotifyApi/getPlaylistTrack");
router.get("/my-playlist", (req, res) => {
  PlaylistModel.find({ createrId: req.session.user.userid }).then(
    (myplaylist) => {
      User.findOne({ userId: req.session.user.userid }).then((user) => {
        myplaylist.forEach((item) => {});
        res.send(myplaylist);
      });
    }
  );
});

router.get("/my-playlist/:id", (req, res) => {
  PlaylistModel.findOne({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/my-playlist-track/:id/:token", async (req, res) => {
  try {
    const getThisPlaylistTrack = await getMyPlayList(
      req.params.token,
      req.params.id,
      req.session.user.userid
    );
    res.send(getThisPlaylistTrack);
  } catch (err) {
    console.log(err);
  }
});

router.post("/add-track-to-spotify-playlist", async (req, res) => {
  let { token, playlistId, trackUri } = req.body;
  const addTrack = await addTracksToPlaylist(token, playlistId, trackUri);
  res.send({ succes: true });
});

router.post("/edit-playlist", (req, res) => {});
async function getMyPlayList(token, id, userId) {
  try {
    const getThisPlaylistTrack = await getPlaylistTrack(token, id);
    return getThisPlaylistTrack;
  } catch (err) {
    if (err.body.error.message === "The access token expired") {
      let newToken = await refreshToken(userId);
      const getThisPlaylistTrack = getMyPlayList(newToken, id, userId);
      return getThisPlaylistTrack;
    }
  }
}

module.exports = router;
