const express = require("express");
const User = require("../models/user");
const playlistApi = require("../spotifyApi/playlist");
const aboutMe = require("../spotifyApi/aboutMe");
const PlaylistModel = require("../models/playlist");
const getPlaylistTrack = require("../spotifyApi/getPlaylistTrack");
const router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");

router.post("/save-my-token", async (req, res) => {
  const code = req.body.code;
  const spotifyApi = new spotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDRIECTURI,
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then(async (data) => {
      createMyPlayListFromSpotify(
        data.body.access_token,
        req.body.id,
        req.session.user.userid
      );
      let payload = {};
      payload = req.body;
      (payload.token = data.body.access_token),
        (payload.refreshToken = data.body.refresh_token);
      payload.expiresIn = data.body.expires_in;

      let id = await getMySpotifyProfileId(payload.token);
      User.findOneAndUpdate(
        { _id: req.session.user.userid },
        {
          $push: {
            connectedAccounts: payload,
          },
        }
      )
        .then((result) => {
          res.send({ succes: true });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

async function createMyPlayListFromSpotify(token, id, userId) {
  console.log(id);
  const myPlaylist = await playlistApi(token, id);
  myPlaylist.forEach((playlist) => {
    let playListModelPayLoad = {
      playlistName: playlist.name,
      createrId: userId,
      playListId: playlist.id,
      numberOfsounds: playlist.tracks.total,
      isPrivate: true,
      platform: "spotify",
      collaborative: false,
      playListUrl: playlist.external_urls.spotify,
      description: playlist.description,
      images: playlist.images,
    };
    PlaylistModel.create(playListModelPayLoad)
      .then((result) => {})
      .catch((err) => {
        console.log("err");
      });
  });
}

async function getMySpotifyProfileId(token) {
  const aboutTheUser = await aboutMe(token);
  return aboutTheUser.id;
}

module.exports = router;

// {
//   collaborative: false,
//   description: 'Song descriptions help the artist connect with listeners and fans and evoke emotions, memories, senses, and even actions – such as someone deciding to promote your song themselves on their socials because of what you wrote about it or for other bloggers to pick up and write about you because they ha',
//   external_urls: {
//     spotify: 'https://open.spotify.com/playlist/2N0jKJ1pxqg3MSCMpP5jPv'
//   },
//   href: 'https://api.spotify.com/v1/playlists/2N0jKJ1pxqg3MSCMpP5jPv',
//   id: '2N0jKJ1pxqg3MSCMpP5jPv',
//   images: [],
//   name: 'Dance Music',
//   owner: {
//     display_name: 'Kenneth',
//     external_urls: {
//       spotify: 'https://open.spotify.com/user/przeq4p2olryi6ympb8b3x9gf'
//     },
//     href: 'https://api.spotify.com/v1/users/przeq4p2olryi6ympb8b3x9gf',
//     id: 'przeq4p2olryi6ympb8b3x9gf',
//     type: 'user',
//     uri: 'spotify:user:przeq4p2olryi6ympb8b3x9gf'
//   },
//   primary_color: null,
//   public: true,
//   snapshot_id: 'Miw1OGZhYzNmYzUwM2Y5ZTEyYWE3YzM0MDcxMDE5ZmZlZjRkM2E1NTY1',
//   tracks: {
//     href: 'https://api.spotify.com/v1/playlists/2N0jKJ1pxqg3MSCMpP5jPv/tracks',
//     total: 0
//   },
//   type: 'playlist',
//   uri: 'spotify:playlist:2N0jKJ1pxqg3MSCMpP5jPv'
// }
