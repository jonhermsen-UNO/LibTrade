const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
//followed this tutorial 'https://www.youtube.com/watch?v=kDhYUPcDS28&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x&index=5'
//also this https://medium.com/@bogna.ka/integrating-google-oauth-with-express-application-f8a4a2cf3fee

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });    passport.deserializeUser((user, done) => {
        done(null, user);
    });

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