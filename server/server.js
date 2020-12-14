const express = require('express')
const app = express()


// ==== routes ====


const account = require('./api/routes/account')
app.use('/api/account', account)

const listing = require('./api/routes/listing')
app.use('/api/listing', listing)


// ==== headers ====


// parse headers into JSON
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// send session cookies
const session = require('express-session')
app.use(session({
	secret: require('./config/keys').session,
	saveUninitialized: false,
	resave: false,
  rolling: true
}))
// enable CORS with the client
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', '*')
  next()
})


// ==== passport ====


const passport = require('passport')
const passportSetup = require('./util/passport')
passportSetup(passport)
app.use(passport.initialize())
app.use(passport.session())


// ==== database ====


const { Sequelize } = require('sequelize')
const db = require('./config/database')
const sequelize = new Sequelize(db)
// create and validate a database connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))
// create any tables that do not already exist
const accountTable = require('./api/models/accountMod')
const collegeTable = require('./api/models/collegeMod')
const listingTable = require('./api/models/listingMod')
const bookTable = require('./api/models/bookMod')
// NOTE: use { force: true } to recreate tables
// WARNING: recreating tables will reset all data!
accountTable.sync({ force: false })
collegeTable.sync({ force: false })
listingTable.sync({ force: false })
bookTable.sync({ force: false })


// ==== server ====


const port = process.env.PORT || '8001'
app.listen(port, () => { console.log("Now listening on port " + port) })
