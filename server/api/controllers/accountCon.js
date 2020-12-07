const accountModel = require('../models/accountMod')
const collegeModel = require('../models/collegeMod')
const passport = require('passport')
const controller = {}

  //logging in
controller.authenticateAccount = passport.authenticate('local', {
  successRedirect: '/hello/:logged_in',
  failureRedirect: '/hello/:not_logged_in'
})

controller.deauthenticateAccount = (request, response) => {
  // Invalidate the account cookie if one exists.
  request.logout()
  return response.send()
}

controller.authenticateGoogle = passport.authenticate('google', {
  scope:['profile']
})

  //TODO: register
controller.registerAccount = (request, response) => {
  response.render('register')
}

controller.sendAccountDetails = (request, response) => {
  // TODO: implement with live data
  response.json({
    AccountID: 2,
    Username: "JDoe"
  })
}

controller.sendColleges = (request, response) => {
  response.send('colleges')
}

module.exports = controller
