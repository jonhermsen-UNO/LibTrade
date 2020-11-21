const controller = require('../controllers/helloCon');
const express = require('express')
const router = express.Router()

router
  .use(controller.checkIP)

router
  .route('/')
  .get(controller.sendDefault)

router
  .route('/:msg')
  .get(controller.sendEcho)
  .post(controller.sendEcho)

module.exports = router
