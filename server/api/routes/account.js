const controller = require('../controllers/accountCon');
const siteController = require('../controllers/helloCon')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .get(controller.authenticateAccount)
  .post(controller.authenticateAccount)

router
  .route('/login')
  .get(controller.authenticateAccount)
  .post(controller.authenticateAccount)

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
