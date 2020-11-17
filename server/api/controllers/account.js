const passport = require("passport")
const accountModel = require('../models/account')
const collegeModel = require('../models/college')
//var LocalStrategy = passport.LocalStrategy
const controller = {

  //logging in
  authenticateAccount : (request, response) => {
    response.render('login', {user: request.user})
  },

  //TODO: register
  registerAccount : (request, response) => {
    response.render('register')
  },

  sendColleges : (request, response) => {
    response.send('colleges')
  }
};

module.exports = controller
