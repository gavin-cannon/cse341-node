const passport = require("passport");
const dotenv = require("dotenv").config({ path: ".env" });
const googleID = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user.id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleID,
      clientSecret: googleSecret,
      callbackURL: "http://localhost:5000/presidents/",
    },
    function (accessToken, refreshToken, profile, cb) {
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
    }
  )
);
