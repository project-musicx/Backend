const getPlaylistTrack = require("./getPlaylistTrack");
const Track= require("../models/track")
async function updateOrCreateMusicTracks(token, id) {
  console.log("gi")
  const getThisPlaylistTracks = await getPlaylistTrack(token, id);
  if(getThisPlaylistTracks.length){
    getThisPlaylistTracks.forEach( async (track) => {
        let trackModel={
            tackName: track.name,
            createrId: "",
            platform: "spotify",
            duration_ms:track.duration_ms,
            album:{
                  album_type: track.album.album_type,
                  href: track.album.href,
                  id:  track.album.id,
                  images: track.album.images,
                  name: track.album.name,
                  release_date: track.album.release_date,
                  total_tracks: track.album.total_tracks,
                  type: track.album.type,
                  uri: track.album.uri
            }, 
            href:track.href,
            songId:track.id,
            popularity:track.popularity,
            preview_url:track.preview_url,
            type:track.type,
            uri:track.uri,

        }
            Track.create(trackModel).then((result)=>{
              console.log(result)
           }).catch((err) => {
          console.log("err")
        });
    })
  }
  }

//   album: {
//     album_type: 'single',
//     artists: [Array],
//     available_markets: [Array],
//     external_urls: [Object],
//     href: 'https://api.spotify.com/v1/albums/5A1qWiQBSEkCpGvQE2YfOH',
//     id: '5A1qWiQBSEkCpGvQE2YfOH',
//     images: [Array],
//     name: 'Ijo (Laba Laba)',
//     release_date: '2022-07-06',
//     release_date_precision: 'day',
//     total_tracks: 1,
//     type: 'album',
//     uri: 'spotify:album:5A1qWiQBSEkCpGvQE2YfOH'
//   },
//   artists: [ [Object] ],
//   available_markets: [
//     'AD', 'AE', 'AG', 'AL', 'AM', 'AO', 'AR', 'AT', 'AU', 'AZ',
//     'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BN',
//     'BO', 'BR', 'BS', 'BT', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CG',
//     'CH', 'CI', 'CL', 'CM', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ',
//     'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'ES',
//     'FI', 'FJ', 'FM', 'FR', 'GA', 'GB', 'GD', 'GE', 'GH', 'GM',
//     'GN', 'GQ', 'GR', 'GT', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT',
//     'HU', 'ID', 'IE', 'IL', 'IN', 'IQ', 'IS', 'IT', 'JM', 'JO',
//     'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KZ',
//     'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV',
//     ... 83 more items
//   ],
//   disc_number: 1,
//   duration_ms: 186000,
//   episode: false,
//   explicit: false,
//   external_ids: { isrc: 'NGA3B2215002' },
//   external_urls: {
//     spotify: 'https://open.spotify.com/track/7tZMF9Hn5uGsfC7zGXbSKM'
//   },
//   href: 'https://api.spotify.com/v1/tracks/7tZMF9Hn5uGsfC7zGXbSKM',
//   id: '7tZMF9Hn5uGsfC7zGXbSKM',
//   is_local: false,
//   name: 'Ijo (Laba Laba)',
//   popularity: 62,
//   preview_url: 'https://p.scdn.co/mp3-preview/324c69b9ffed6b434c4a0a22f98f9cee3d220da1?cid=f4e7b3663624411993e1a7d429ed3fc8',
//   track: true,
//   track_number: 1,
//   type: 'track',
//   uri: 'spotify:track:7tZMF9Hn5uGsfC7zGXbSKM'
// }


  module.exports =updateOrCreateMusicTracks