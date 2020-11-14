const controller = require('../controllers/account');
const express = require('express')
const router = express.Router()

router
  .route('/')
  .post(controller.authenticateAccount)

router
  .route('/register')
  .post(controller.registerAccount)

router
  .route('/colleges')
  .get(controller.sendColleges)

module.exports = router
