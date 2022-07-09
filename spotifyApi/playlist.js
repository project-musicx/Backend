
const spotifyConfig= require("../utility/config")

async function getUserPlaylists(token , userName) {
   
    const spotifyApi =spotifyConfig(token)
    const data = await spotifyApi.getUserPlaylists(userName)
    let playlists = []
   
    for (let playlist of data.body.items) {
      let tracks = await getPlaylistTracks(playlist.id, playlist.name);
      const tracksJSON = { tracks }
      let data = tracksJSON;
      if(data.tracks.length>0){
        playlists.push(data)
      }

    }
    return playlists
    async function getPlaylistTracks(playlistId, playlistName) {
        const data = await spotifyApi.getPlaylistTracks(playlistId, {
          offset: 1,
          limit: 10,
          fields: 'items'
        });
        let tracks = [];
      
        for (let track_obj of data.body.items) {
          const track = track_obj.track
          tracks.push([track.name + " : " + track.artists[0].name]);
          
        }
        return tracks;
      }
  }


  module.exports=getUserPlaylists