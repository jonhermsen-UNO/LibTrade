const controller = require('../controllers/listingCon')
const express = require('express')
const router = express.Router()

router
  .use((request, response, next) => {
    if (!request.session
      || !request.session.passport
      || !request.session.passport.user) {
      return response.status(403).send('Error: you must login to perform that action')
    }
    next()
  })

router
  .route('/')
  .post(controller.getListings)

router
  .route('/create')
  .post(controller.doListingCreate)

router
  .route('/remove')
  .post(controller.doListingRemove)

router
  .route('/book')
  .post(controller.getBookByISBN)

router
  .route('/book/:BookID')
  .get(controller.getBookByID)


module.exports = router