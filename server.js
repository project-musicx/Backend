const express= require("express")
const app = express()
app.get("/",(req,res)=>{
    res.send("spotify player music")
})
app.listen(3000)