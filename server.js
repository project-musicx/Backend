require("dotenv").config();
const express = require("express")
const app = express()
const spotifyWebApi = require("spotify-web-api-node")
require("dotenv").config();
const PORT = process.env.PORT || 3000
const authRouter = require('./routes/google-auth')
let Token=""
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/auth', authRouter)

const scope = require("./utility/scope")
const aboutMe = require("./shopifyApi/aboutMe")
const playlistApi = require("./shopifyApi/playlist")
const spotifyApi = new spotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDRIECTURI
})

app.get("/", (req, res) => {
  res.json("Welcome to out music sharing app")
})

app.get("/login", (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scope))
})

app.get("/logged", (req, res) => {
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
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];
      Token=access_token
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      res.send('Success! You can now close the window.');

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];


        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch(error => {

      res.send(`Error getting Tokens: ${error}`);
    });
});

app.get("/my-spotify-date", (req, res) => {
  const aboutTheUser = aboutMe(Token)
  aboutTheUser.then((result) => {
    res.send(`Hello ${result.display_name} How are you ?`);
  }).catch((error) => {
    res.send("Something went wrong")
  })
})

app.get("/my-playlist", (req, res) => {
  const myPlaylist = playlistApi(Token, process.env.ID)
  myPlaylist.then((result) => {
    res.send(JSON.stringify(result, undefined, 40))
  }).catch((error) => {
    res.send("Something went wrong")
  })
})

app.listen(PORT)