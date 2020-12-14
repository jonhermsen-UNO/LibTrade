const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const {Sequelize, Model, DataTypes } = require('sequelize')
var db = require('./lib/dbconn')

// enable content-type application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create and validate a connection with MySQL
const sequelize = new Sequelize(db);
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// create tables if they do not already exist
const accountTable = require('./api/models/accountMod')
const collegeTable = require('./api/models/collegeMod')
const listingTable = require('./api/models/listingMod')
const bookTable = require('./api/models/bookMod')
// NOTE: use { force: true } to recreate the table
// WARNING: forcing causes all data to be lost
accountTable.sync({ force: false })
collegeTable.sync({ force: false })
listingTable.sync({ force: false })
bookTable.sync({ force: false })

// start passport
app.use(session({
	secret: require('./config/keys').session,
	resave: false,
	saveUninitialized: false,
  rolling: true
}))
passportSetup(passport)
app.use(passport.initialize())
app.use(passport.session())

// enable CORS with the client
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', '*')
  next()
})

const hello = require('./api/routes/hello')
app.use('/hello', hello)

const account = require('./api/routes/account')
app.use('/api/account', account)

const listing = require('./api/routes/listing')
app.use('/api/listing', listing)

const port = process.env.PORT || '8001'
app.listen(port, () => {
    console.log("Now listening on port " + port);
})
