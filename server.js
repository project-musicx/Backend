const express= require("express")
const app = express()
require("dotenv").config();
const PORT= process.env.PORT||3000
const querystring= require("querystring")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/login",(req,res)=>{
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id:process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.REDRIECTURI,
      state: "gjkktlnmjklmn"
    }));
})
app.get("/logged",(req,res)=>{
console.log(req.body)
res.send("succed")
})
app.listen(PORT)