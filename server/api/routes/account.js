const controller = require('../controllers/accountCon')
const siteController = require('../controllers/helloCon')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .get(controller.sendAccountDetails)

router
  .route('/login')
  .post(controller.authenticateAccount)

router
  .route('/logout')
  .post(controller.deauthenticateAccount)

router
  .route('/register')
  .post(controller.registerAccount)

router
  .route('/colleges')
  .get(controller.sendColleges)

/*** Unofficial APIs ***/

router
  .route('/login-google')
  .post(controller.authenticateGoogle)

router
  .route('/callback')
  .get(siteController.sendDefault)
  .post(siteController.sendDefault)

module.exports = router
