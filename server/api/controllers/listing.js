const listingModel = require('../models/listing')
const bookModel = require('../models/book')
const controller = {}

controller.sendListings = (request, response) => {
  listingModel
    .getListings()
    .then((listings) => {
      response.json(listings)
    })
}

controller.sendBook = (request, response) => {
  bookModel
    .getBook(request.params.id)
    .then((book) => {
      response.json(book)
    })
}

module.exports = controller
