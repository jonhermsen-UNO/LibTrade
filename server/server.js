const passport = require('passport')
const auth = require('./config/passport-setup')
const express = require('express')
const app = express()

auth(passport)
app.use(passport.initialize())

const hello = require('./api/routes/hello')
app.use('/hello', hello)

const account = require('./api/routes/account')
app.use('/api/account', account)

app.get('/api/account/callback', 
  passport.authenticate('google', { failureRedirect: '/api/account' }),
  function(req, res) {
    res.redirect('/hello');
  });

const port = process.env.PORT || '8000'
app.listen(port, () => {
    console.log("Now listening on port " + port);
})
