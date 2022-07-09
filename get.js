const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
//Add your own access_token
const token = "BQAIv0gbGS_k-3ttWrzn0NP3Y0gfpjAhjmI7VrxMijDWD2dOCPziV778D4evNDUyNwiWZ0hlzFp-r60WVdYjmxVaFqgvnljQcZ8AnxrVA77ZhxquBcql2rr6jSZ9UbVXahBt18zAST6EVGfR6-pietjNcDF-R8-IigfM-AG2UeH7-Ro9-uTOfHZpAruNEYebU6VuGg_p6SDq0_7idfgKExFDdicw7uES2SQoNFcdxCD5ULQGybEox9M_CAZjazP537djMolj2Gb6zvA0Lf3HgPdaTIfGARWuYzN4qtdFcMyjJKIca6bawzCxyPGcm24Pbq5k3YGphGA0F27QO5BZ";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
     console.log(me.body);
   // getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("---------------+++++++++++++++++++++++++")
  let playlists = []

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id)
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

    const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name+'.json', data);
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  return tracks;
}

getMyData()