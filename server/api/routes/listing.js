const controller = require('../controllers/listingCon')
const express = require('express')
const router = express.Router()

router
.route('/create')
  .get(controller.createListing)
  .post(controller.postListing)

router
.route('/view/:id')
    .get(controller.viewListing)
    .post(controller.viewListing)

router
.route('/remove/:id')
    .get(controller.viewListing)
    .post(controller.removeListing)