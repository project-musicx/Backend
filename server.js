
const express= require("express")
const app = express()
require("dotenv").config();
const PORT= process.env.PORT||3000
const request= require("request")
const querystring= require('node:querystring')
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
    var code = req.query.code || null;
    var state = req.query.state || null;
    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
       let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
              code: code,
              redirect_uri: process.env.REDRIECTURI,
              grant_type: 'authorization_code'
            },
            headers: {
              'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
            },
            json: true
          };
          request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body)
              var access_token = body.access_token;
              res.send({
                'access_token': access_token
              });
            }
          });
            }
});


app.listen(PORT)