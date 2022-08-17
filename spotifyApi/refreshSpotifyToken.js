const express = require("express");
const User = require("../models/user");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");

function refresh() {
  User.findOne({ _id: "62f5d60591f33d12eb651bd7" }).then((user) => {
    let spotify = user.connectedAccounts.find(
      (account) => account.accountType === "spotify"
    );
    const refreshToken = spotify.refreshToken;
    const spotifyApi = new spotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken,
    });
    spotifyApi
      .refreshAccessToken()
      .then((data) => {
        user.connectedAccounts.forEach((account) => {
          if (account.accountType === "spotify") {
            update(account, data.body.accessToken, data.body.expiresIn);
          }
        });
        user.save();
      })
      .catch((err) => {
        console.log(err);
        // res.sendStatus(400);
      });
  });
}

function update(object, accessToken, expiresIn) {
  object.token = accessToken;
  object.expiresIn = expiresIn;
}

function refreshUserSpotifyTokeTimer() {
  //setInterval(refresh,100000)
}
module.exports = refreshUserSpotifyTokeTimer;
