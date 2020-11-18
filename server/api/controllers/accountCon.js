const accountModel = require('../models/account')
const collegeModel = require('../models/college')
const passport = require('passport')
const controller = {}

  //logging in
controller.authenticateAccount = passport.authenticate('google', {
  scope: ['profile']
})
/*(request, response) => {
  accountModel.updateMessage('login!')
  response.json(accountModel)*/

  //TODO: register
controller.registerAccount = (request, response) => {
  response.render('register')
}

controller.sendColleges = (request, response) => {
  response.send('colleges')
}
module.exports = controller
