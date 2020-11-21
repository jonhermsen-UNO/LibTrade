const accountModel = require('../models/account')
const collegeModel = require('../models/college')
const passport = require('passport')
const controller = {}

  //logging in
controller.authenticateAccount = passport.authenticate('local', {
  successRedirect: '/hello/:logged+in',
  failureRedirect: '/hello/:not+logged+in'
})

controller.authenticateGoogle = passport.authenticate('google', {
  scope:['profile']
})

  //TODO: register
controller.registerAccount = (request, response) => {
  response.render('register')
}

controller.sendColleges = (request, response) => {
  response.send('colleges')
}
module.exports = controller
