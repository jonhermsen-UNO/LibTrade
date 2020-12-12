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

controller.registerAccount = (request, response) => {
  if (!request.body.CollegeID
    || !request.body.Email
    || !request.body.Username
    || !request.body.Password) {
    response.status(400).send('Error: invalid input - please fill in all fields')
  }

  accountModel
    .create({
      CollegeID: request.body.CollegeID,
      Email: request.body.Email,
      Username: request.body.Username,
      Password: request.body.Password
    })
    .then(() => {
      response.send('Success: account created successfully')
    })
    .catch((error) => {
      let message = 'Error: cannot create user account'
      if (error.original && error.original.code === 'ER_DUP_ENTRY') {
        message += ' - username or email exists'
      }
      response.status(400).send(message)
    });
}

controller.sendAccountDetails = (request, response) => {
  // TODO: implement with live data
  response.json({
    AccountID: 2,
    Username: "JDoe"
  })
}

controller.sendColleges = (request, response) => {
  collegeModel
    .findAll({
      order: [
        ['State', 'ASC'],
        ['Name', 'ASC']
      ]
    })
    .then((colleges) => {
      if (!colleges) response.status(400).send('No colleges available')
      response.json(colleges)
    })
}

module.exports = controller
