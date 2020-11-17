const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
//followed this tutorial 'https://www.youtube.com/watch?v=kDhYUPcDS28&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x&index=5'

passport.use(
    new GoogleStrategy({
    clientID: keys.google.clientID, //google api id and secret, can find in dev console
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect', //callback url to go to after auth 
    }, ()=> {
        //passport callback function
    })

)