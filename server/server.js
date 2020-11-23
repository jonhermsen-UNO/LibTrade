const passport = require('passport')
const auth = require('./config/passport-setup')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
var db = require('./lib/dbconn')

//allows us to parse the app/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//create instance of sequelize from db info
const sequelize = new Sequelize(db);
//check connection to db
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

//session info
/*const sequelize = new Sequelize({
  name: 'LIBSESH',
  secret: 'APHOTOOFSPONGEBOBATTHECHRISTMASPARTY',
  resave: true,
  saveUninitialized: true
});*/

//start passport
auth(passport)
app.use(passport.initialize())
app.use(passport.session())

const hello = require('./api/routes/hello')
app.use('/hello', hello)

const account = require('./api/routes/account')
app.use('/api/account', account)

//where the user goes after authenticating with google
app.get('/api/account/callback', 
  passport.authenticate('google', { failureRedirect: '/api/account' }),
  function(req, res) {
    res.redirect('/hello');
  });

const port = process.env.PORT || '8001'
app.listen(port, () => {
    console.log("Now listening on port " + port);
})
