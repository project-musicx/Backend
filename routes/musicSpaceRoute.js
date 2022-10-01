const express = require("express");
const User = require("../models/user");
const MusicSyncSpace = require("../models/musicSyncSpace");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");

router.post("/transition-musicsyncspace", async (req, res) => {
    User.findOneAndUpdate({_id:req.session.user.userId},{musicsyncspace:req.body.body.musicsyncspace}).then((result) =>{
        res.send(result)
    })
});


module.exports = router;
