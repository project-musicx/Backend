

async function aboutMe(token) {
  const SpotifyWebApi = require('spotify-web-api-node');
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  return new Promise((resolve, reject) => {
    (async () => {
      const me = await spotifyApi.getMe();
      resolve(me.body)
    })().catch(e => {
      reject(e);
    });
  })

}
module.exports = aboutMe