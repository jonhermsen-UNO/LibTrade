const accountModel = require('../models/account')
const collegeModel = require('../models/college')
const controller = {}

controller.authenticateAccount = (request, response) => {
  response.send('login')
}

controller.registerAccount = (request, response) => {
  response.send('register')
}

controller.sendColleges = (request, response) => {
  response.send('colleges')
}

module.exports = controller
