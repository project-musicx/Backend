const express = require("express");
const User = require("../models/user");
const MusicSyncSpace = require("../models/musicSyncSpace");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");

router.post("/transition-musicsyncspace", async (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { musicsyncspace: req.body.musicsyncspace }
  ).then((result) => {
    res.send({ succes: true });
  });
});

router.get("/connect-to-musicsyncspace/:id", async (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((result) => {
      res.send({ musicsyncspace: result.musicsyncspace });
    })
    .catch((err) => [res.error(err)]);
});

module.exports = router;
