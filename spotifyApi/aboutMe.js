

<<<<<<< HEAD

const spotifyConfig= require("../utility/config")

async function  aboutMe(token) {
 const spotifyApi =spotifyConfig(token)
return new Promise((resolve, reject) => {
=======
async function aboutMe(token) {
  const SpotifyWebApi = require('spotify-web-api-node');
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  return new Promise((resolve, reject) => {
>>>>>>> d7a4845a2b96ea9b7ead9537fa8db83fb48aac04
    (async () => {
      const me = await spotifyApi.getMe();
      resolve(me.body)
    })().catch(e => {
      reject(e);
    });
  })

}
module.exports = aboutMe