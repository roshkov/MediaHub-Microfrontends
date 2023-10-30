// import { twitterConfig } from "./utils/constants";

// const express = require("express");
// const session = require("express-session");
// const passport = require("passport");
// const TwitterStrategy = require("passport-twitter").Strategy;

// const app = express();

// app.use(
//   session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//   new TwitterStrategy(twitterConfig, (token, tokenSecret, profile, done) => {
//     // Your logic to handle user data and authentication
//     // Typically, you'd create or update a user in your database here
//     return done(null, profile);
//   })
// );

// import { twitterConfig } from "./utils/constants";
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3100;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const twitterConfig = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.CALLBACK_URL,
};
console.log("twitterConfig.consumerKey  ", twitterConfig.consumerKey);

passport.use(
  new TwitterStrategy(twitterConfig, (token, tokenSecret, profile, done) => {
    // Handle user data and authentication here.
    // This is where you would create or update a user in your database.
    console.log("token", token);
    console.log("profile", profile);
    return done(null, profile);
  })
);

// Define the Twitter authentication route
// app.get("/auth/twitter", passport.authenticate("twitter"));

app.get("/auth/twitter", (req, res, next) => {
  passport.authenticate("twitter", (err, user, info) => {
    if (err) {
      // console.error(err);
      console.log("what happened: ", err, " user", user, "  info ", info);
      // Handle the error here
      // You can, for example, redirect to an error page
      // return res.redirect("/error");
    }
    if (!user) {
      console.error(info);
      // Handle the info here
      // You can, for example, redirect to an info page or show a message
      // return res.redirect("/info");
    }
    // Successful authentication, this part will not execute unless successful
    // In case of success, it will continue to the callback route
  })(req, res, next);
});

// Handle the callback route after Twitter authentication
app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect or respond as needed
    res.redirect("/profile");
  }
);

app.listen(port, () => {
  console.log(`OAuth server is running on port ${port}`);
});
