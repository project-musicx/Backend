const spotifyWebApi = require("spotify-web-api-node");
const spotifyConfig = require("../utility/config");
function addTracksToPlaylist(token, playListId, trackUri) {
  return new Promise(function (resolve, reject) {
    const spotifyApi = spotifyConfig(token);
    spotifyApi
      .addTracksToPlaylist(playListId, [trackUri], {
        position: 0,
      })
      .then(function (data) {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = addTracksToPlaylist;
