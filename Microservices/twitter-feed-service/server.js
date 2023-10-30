const express = require("express");
const passport = require("passport");
const { Strategy } = require("@superfaceai/passport-twitter-oauth2");
const session = require("express-session");
require("dotenv").config();

// <1> Serialization and deserialization
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Use the Twitter OAuth2 strategy within Passport
passport.use(
  // <2> Strategy initialization
  new Strategy(
    {
      clientID: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      clientType: "confidential",
      callbackURL: process.env.CALLBACK_URL,
    },
    // <3> Verify callback
    (accessToken, refreshToken, profile, done) => {
      console.log("Success!", { accessToken, refreshToken });
      //because of this, later we can do req.user.accessToken
      const user = {
        accessToken,
        refreshToken,
        profile,
      };
      return done(null, user);
    }
  )
);

const app = express();
const port = process.env.PORT || 3100;

// <4> Passport and session middleware initialization
app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// <5> Start authentication flow
app.get(
  "/auth/twitter",
  passport.authenticate("twitter", {
    // <6> Scopes
    scope: ["tweet.read", "users.read", "offline.access"],
  })
);

// <7> Callback handler
app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter"),
  function (req, res) {
    const userData = JSON.stringify(req.user, undefined, 2);

    const accessToken = req.user.accessToken;
    const refreshToken = req.user.refreshToken;

    // console.log("access token console ", req.user.accessToken);

    res.redirect(
      `http://localhost:1001/?twitterAccessToken=${accessToken}&twitterRefreshToken=${refreshToken}`
    );

    // res.redirect(
    //   `http://localhost:1001/oauth-callback?accessToken=${accessToken}&refreshToken=${refreshToken}`
    // );

    // res.end(
    //   `<h1>Authentication succeeded</h1> User access token: <pre>${req.user.accessToken}</pre>`
    // );
  }
);

app.listen(port, () => {
  console.log(`server.js is running on port ${port}`);
});
