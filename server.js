require("dotenv").config();
const express = require("express")
const app = express()
const spotifyWebApi = require("spotify-web-api-node")
require("dotenv").config();
const PORT = process.env.PORT || 3000
const authRouter = require('./routes/google-auth')
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

app.get("/my-spotify-date", (req, res) => {
  const aboutTheUser = aboutMe(req.body.token)
  aboutTheUser.then((result) => {
    res.send(`Hello ${result.display_name} How are you ?`);
  }).catch((error) => {
    res.send("Something went wrong")
  })
})

app.get("/my-playlist", (req, res) => {
  const myPlaylist = playlistApi(req.body.token, process.env.ID)
  myPlaylist.then((result) => {
    res.send(JSON.stringify(result, undefined, 40))
  }).catch((error) => {
    res.send("Something went wrong")
  })
})

app.listen(PORT)