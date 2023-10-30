import { twitterConfig } from "./utils/constants";

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;

const app = express();

app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new TwitterStrategy(twitterConfig, (token, tokenSecret, profile, done) => {
    // Your logic to handle user data and authentication
    // Typically, you'd create or update a user in your database here
    return done(null, profile);
  })
);
