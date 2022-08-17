require("dotenv").config();
const express = require("express");
const app = express();
const expressSession = require("express-session");
const cors = require("cors");
const db = process.env.DB;
const mongoose = require("mongoose");
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
const MongoStore = require("connect-mongo");
const spotifyWebApi = require("spotify-web-api-node");
const PORT = process.env.PORT || 4000;
app.use(cors());
const authRouter = require("./routes/auth");
const tokenRouter = require("./routes/musicToken");
const playListRouter = require("./routes/playListRouter");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    name: process.env.NAME,
    secret: process.env.SECRET,
    store: MongoStore.create({
      mongoUrl: db,
      stringify: false,
      ttl: 14 * 24 * 60 * 60 * 60 * 60 * 60 * 60,
      autoRemove: "native",
    }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: true,
      maxAge: 100000000000000,
    },
  })
);
app.use("/api/auth", authRouter);
app.use("/api", tokenRouter);
app.use("/api", playListRouter);

app.listen(PORT);
