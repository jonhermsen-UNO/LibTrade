const express = require('express')
const app = express()


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
// add basic header protections
const helmet = require('helmet')
app.use(helmet())
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
  .catch((error) => console.error('Unable to connect to the database:', error))
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


// ==== routes ====


const account = require('./api/routes/account')
app.use('/api/account', account)

const listing = require('./api/routes/listing')
app.use('/api/listing', listing)


// ==== server ====


const port = process.env.PORT || '8001'
app.listen(port, () => { console.log('Now listening on port ' + port) })
