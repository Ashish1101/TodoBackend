const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('config')
const ClientID = config.get('GOOGLE_CLIENT_ID')
const ClientSecret = config.get('GOOGLE_CLIENT_SECRET')
const User = require('../Models/User');


passport.use(new GoogleStrategy({
    clientID: ClientID,
    clientSecret: ClientSecret,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('profile' ,profile);
    User.findOne({email: profile._json.email})
    .then((user => {
      if(user) {
        return cb(err , null)
      }
      user = new User({
        name: profile._json.name,
        email: profile._json.email,
        image: profile._json.picture
      })
      return cb(null , user)
    })).catch(err => console.log(err.message))
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});