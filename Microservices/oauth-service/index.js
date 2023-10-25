const express = require("express");
const session = require("express-session");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;

const app = express();

// Configure Express session
app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Your Twitter API credentials
const twitterConfig = {
  consumerKey: "YOUR_CONSUMER_KEY",
  consumerSecret: "YOUR_CONSUMER_SECRET",
  callbackURL: "http://localhost:3000/auth/twitter/callback", // Change to your callback URL
};

// Use the TwitterStrategy
passport.use(
  new TwitterStrategy(twitterConfig, (token, tokenSecret, profile, done) => {
    // Your logic to handle user data and authentication
    // Typically, you'd create or update a user in your database here
    return done(null, profile);
  })
);
