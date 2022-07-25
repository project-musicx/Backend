
const spotifyConfig= require("../utility/config")

async function getPlaylistTrack(token,playlistId, playlistName) {
  const spotifyApi =spotifyConfig(token)
    const data = await spotifyApi.getPlaylistTracks(playlistId, {
      offset: 1,
      limit: 20,
      fields: 'items'
    });
    let tracks = [];
  
    for (let track_obj of data.body.items) {
      const track = track_obj.track
      tracks.push(track)
    }
    return tracks;
  }

  module.exports=getPlaylistTrack
  