const controller = require('../controllers/accountCon');
const express = require('express')
const router = express.Router()

router
  .route('/')
  .get(controller.authenticateAccount)
  .post(controller.authenticateAccount)

router
  .route('/register')
  .post(controller.registerAccount)

router
  .route('/colleges')
  .get(controller.sendColleges)

module.exports = router
