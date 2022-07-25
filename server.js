
const express= require("express")
const app = express()
const spotifyWebApi= require("spotify-web-api-node")
require("dotenv").config();
const cors= require("cors")
const PORT= process.env.PORT||5000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const scope= require("./utility/scope")
let TOKEN=""
app.use(cors())
const aboutMe= require("./spotifyApi/aboutMe")
const playlistApi=require("./spotifyApi/playlist")
const getPlaylistTrack = require("./spotifyApi/getPlaylistTrack")
const spotifyApi= new spotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    redirectUri: process.env.REDRIECTURI
})
function login(){
  
}
app.get("/",(req,res)=>{
  res.json("Welcome to out music sharing app")
})
app.get("/login",(req,res)=>{
    res.redirect(spotifyApi.createAuthorizeURL(scope))
})
app.get("/logged",(req,res)=>{
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
  
    if (error) {
 
      res.send(`Callback Error: ${error}`);
      return;
    }

    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      TOKEN= access_token
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      res.send('Success! You can now close the window.');
      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];
        TOKEN= access_token

        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch(error => {
    
      res.send(`Error getting Tokens: ${error}`);
    });


});
app.get("/my-spotify-date",(req,res)=>{
const  aboutTheUser=  aboutMe(TOKEN)
aboutTheUser.then((result)=>{
  res.send(`Hello ${result.display_name} How are you ?`);
}).catch((error)=>{
res.send("Something went wrong")
})
})

app.get("/my-playlist",(req,res)=>{
  const myPlaylist=playlistApi(TOKEN, process.env.ID)
  myPlaylist.then((result)=>{
    res.send(result)
  }).catch((error)=>{
  res.status(500).send('Something broke!')
  })
})

app.get("/my-playlist/:id",(req,res)=>{
  const myPlaylist=playlistApi(TOKEN, process.env.ID)
  myPlaylist.then((result)=>{
let currentPlayList= result.find((item)=>item.id==req.params.id)
let data={}
data.currentPlayList=currentPlayList
let getTrack= getPlaylistTrack(TOKEN,req.params.id)
getTrack.then((track)=>{
  data.track= track
  res.send(data)
}).catch((error)=>{
res.status(500).send('Something broke!')
})
  }).catch((error)=>{
  res.status(500).send('Something broke!')
  })
})

app.listen(PORT)