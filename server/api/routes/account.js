const controller = require('../controllers/accountCon')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .get(controller.getAccountDetails)

router
  .route('/login')
  .post(controller.doAccountLogin)

router
  .route('/logout')
  .post(controller.doAccountLogout)

router
  .route('/register')
  .post(controller.doAccountRegister)

router
  .route('/colleges')
  .get(controller.getColleges)

module.exports = router
