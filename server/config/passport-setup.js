const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local')
const keys = require('./keys');
const User = require('../api/models/accountMod')

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });    
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new LocalStrategy( 
      {
        username:'username', 
        password:'password',
        passReqToCallback: true
      },
        function(req, username, password, done) {
          console.log(username);
          User.findOne( {attributes:['username'], where: {username: username, password: password}}).then(
            function(authUser) {
              if(authUser){
                return done(null, authUser);
              }
              else{
                return done(null, false, {message: 'incorrect credentials'});
              }
            });
          })
    );

    /*passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done){
        connection.query("select * from tbl_users where id = "+ id, function (err, rows){
            done(err, rows[0]);
        });
    });*/

    passport.use(
        new GoogleStrategy({
        clientID: keys.google.clientID, //google api id and secret, can find in dev console
        clientSecret: keys.google.clientSecret,
        callbackURL: '/api/account/callback', //callback url to go to after auth 
        }, (token, refreshToken, profile, done)=> {
            //passport callback function
            return done(null, {
                profile: profile,
                token: token
        })

        })
    );
}