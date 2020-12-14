const accountModel = require('../models/accountMod')
const collegeModel = require('../models/collegeMod')
const passport = require('passport')
const bcrypt = require('bcrypt')
const controller = {}

function passwordHash(passwordClear) {
  // HT: https://www.npmjs.com/package/bcrypt#a-note-on-rounds
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(passwordClear, salt)
}

controller.doAccountLogin = (request, response, next) => {
  passport.authenticate('local', (error, account, info) => {
    if (error) return next(error)
    if (!account) return response.status(400).send([account, 'Cannot log in', info])

    request.logIn(account, (error) => {
      if (error) return next(error)

      response.send({
        AccountID: account.AccountID,
        Username: account.Username
      })
    })
  })(request, response, next)
}

controller.doAccountLogout = (request, response) => {
  request.logout()
  return response.send()
}

controller.doAccountRegister = (request, response) => {
  if (!request.body.CollegeID
    || !request.body.Email
    || !request.body.Username
    || !request.body.Password) {
    return response.status(400).send('Error: invalid input - please fill in all fields')
  }

  accountModel
    .create({
      CollegeID: request.body.CollegeID,
      Email: request.body.Email,
      Username: request.body.Username,
      Password: passwordHash(request.body.Password)
    })
    .then((account) => {
      console.log(account)
      response.send('Success: account created successfully')
    })
    .catch((error) => {
      let message = 'Error: cannot create user account'
      if (error.original && error.original.code === 'ER_DUP_ENTRY') {
        message += ' - username or email exists'
      }
      response.status(400).send(message)
    })
}

controller.getAccountDetails = (request, response) => {
  if (!request.session.passport
      || !request.session.passport.user) return response.json(null)

  accountModel
    .findOne({ where: { AccountID: request.session.passport.user } })
    .then((account) => {
      if (!account) return response.json(null)
      return response.json({
        AccountID: account.AccountID,
        Username: account.Username
      })
    })
    .catch((error) => (console.log(error)))
}

controller.getColleges = (request, response) => {
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
