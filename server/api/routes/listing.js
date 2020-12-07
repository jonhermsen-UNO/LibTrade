const controller = require('../controllers/listingCon')
const express = require('express')
const router = express.Router()

router
  .route('/')
  .get(controller.viewListing)
  .post(controller.postListing)
  .delete(controller.removeListing)

router
  .route('/book')
  .get(controller.findBookByISBN)

router
  .route('/book/:BookID')
  .get(controller.findBookById)


module.exports = router