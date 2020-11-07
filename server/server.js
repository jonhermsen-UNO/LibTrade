const express = require('express')
const app = express()

const hello = require('./api/routes/hello')
app.use('/hello', hello)

const port = process.env.PORT || '8000'
app.listen(port)
