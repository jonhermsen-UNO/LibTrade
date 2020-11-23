const controller = require('../controllers/listing');
const express = require('express')
const router = express.Router()

router
  .route('/')
  .get(controller.sendListings)

router
  .route('/book/:id')
  .get(controller.sendBook)

module.exports = router
