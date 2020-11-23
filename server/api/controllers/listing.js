const bookModel = require('../models/book')
const controller = {}

controller.sendListings = (request, response) => {
  response.json({})
}

controller.sendBook = (request, response) => {
  bookModel
    .getBook(request.params.id)
    .then((book) => {
      response.json(book)
    })
}

module.exports = controller
