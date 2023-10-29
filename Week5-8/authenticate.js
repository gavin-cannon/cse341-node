const passport = require("passport");
const dotenv = require("dotenv").config({ path: ".env" });

const googleID = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleID,
      clientSecret: googleSecret,
      callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log("googleID");
      console.log(profile);
      return done(null, profile);
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
    }
  )
);
