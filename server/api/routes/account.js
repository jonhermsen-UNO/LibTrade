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
  .route('/login-google')
  .get(controller.authenticateGoogle)
  .post(controller.authenticateGoogle)

router
  .route('/register')
  .post(controller.registerAccount)

router
  .route('/callback')
  .get(siteController.sendDefault)
  .post(siteController.sendDefault)

router
  .route('/colleges')
  .get(controller.sendColleges)

module.exports = router
