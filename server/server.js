const passportSetup = require('./config/passport-setup')
const express = require('express')
const app = express()

const hello = require('./api/routes/hello')
app.use('/hello', hello)

const account = require('./api/routes/account')
app.use('/api/account', account)

const port = process.env.PORT || '8000'
app.listen(port)
