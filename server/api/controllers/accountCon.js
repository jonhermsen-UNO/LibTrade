const accountModel = require('../models/accountMod')
const collegeModel = require('../models/collegeMod')
const passport = require('passport')
const controller = {}

  //logging in
controller.authenticateAccount = passport.authenticate('local', {
  successRedirect: '/hello/:logged_in',
  failureRedirect: '/hello/:not_logged_in'
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
