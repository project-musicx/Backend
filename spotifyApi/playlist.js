const spotifyConfig = require("../utility/config");

async function getUserPlaylists(token, userName) {
  const spotifyApi = spotifyConfig(token);
  const data = await spotifyApi.getUserPlaylists(userName);
  let playlists = [];
  return data.body.items;
}

module.exports = getUserPlaylists;
