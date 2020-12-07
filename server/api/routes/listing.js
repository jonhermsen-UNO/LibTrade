const controller = require('../controllers/listingCon')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .post(controller.viewListing)

router
  .route('/create')
  .post(controller.postListing)

router
  .route('/remove')
  .post(controller.removeListing)

router
  .route('/book')
  .post(controller.findBookByISBN)

router
  .route('/book/:BookID')
  .get(controller.findBookById)


module.exports = router