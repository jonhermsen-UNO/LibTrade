const accountModel = require('../api/models/accountMod')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

module.exports = (passport) => {
  passport.use(new LocalStrategy({
      usernameField: 'Username',
      passwordField: 'Password'
    }, (Username, Password, callback) => {
      accountModel
        .findOne({ where: { Username: Username } })
        .then((account) => {
          if (account && bcrypt.compareSync(Password, account.Password)) {
            return callback(null, account)
          }
          return callback(null, false)
        })
        .catch((error) => (console.log(error)))
    }))

  passport.serializeUser((account, callback) => {
    return callback(null, account.AccountID)
  })

  passport.deserializeUser((accountID, callback) => {
    accountModel
      .findOne({ where: { AccountID: accountID } })
      .then((account) => {
        if (!account) return callback(null, false)
        return callback(null, account)
      })
      .catch((error) => (console.log(error)))
  })
}
