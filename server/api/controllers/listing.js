const listingModel = require('../models/listing')
const bookModel = require('../models/book')
const controller = {}

controller.searchBook = (request, response) => {
  listingModel
    .searchBook("Calculus")
    .then((listings) => {
      response.json(listings)
    })
}

controller.sendListings = (request, response) => {
  listingModel
    .getListings()
    .then((listings) => {
      response.json(listings)
    })
}

controller.sendBook = (request, response) => {
  bookModel
    .getBookById(request.params.id)
    .then((book) => {
      response.json(book)
    })
}

module.exports = controller
