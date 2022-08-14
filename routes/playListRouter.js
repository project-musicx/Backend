const express = require("express");
const PlaylistModel = require("../models/playlist");
const User = require("../models/user");
const router = express.Router();
const getPlaylistTrack = require("../spotifyApi/getPlaylistTrack");

router.get("/my-playlist", (req, res) => {
  PlaylistModel.find({ createrId: req.session.user.userid }).then(
    (myplaylist) => {
      User.findOne({ userId: req.session.user.userid }).then((user) => {
        myplaylist.forEach((item) => {
        ///  updateOrCreateMusicTracks(user.connectedAccounts[0].token, item.id);
        });
        myplaylist.forEach((item) => {});
        res.send(myplaylist);
      });
    }
  );
});

router.get("/my-playlist/:id", (req, res) =>{
  PlaylistModel.findOne({ _id: req.params.id }).then((result)=>{
res.send(result)
  }).catch((err) =>{
    console.log(err)
  })
})
   

async function updateOrCreateMusicTracks(token, id) {
  const getThisPlaylistTracks = await getPlaylistTrack(token, id);
  console.log(getThisPlaylistTracks);
}

module.exports = router;
