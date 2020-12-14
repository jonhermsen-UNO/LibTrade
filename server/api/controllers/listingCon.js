const { Op } = require('sequelize')
const listingModel = require('../models/listingMod')
const bookModel = require('../models/bookMod')
const keys = require('../../config/keys')
const axios = require('axios').default
const controller = {}

// Transform Google Book data to match the LibTrade schema
function transformBook(googleBook) {
  const Book = {}

  Book.BookID = googleBook.id
  if (googleBook.volumeInfo) {
    Book.PublishYear = parseInt(googleBook.volumeInfo.publishedDate.substring(0, 4) , 10)
    Book.Publisher = googleBook.volumeInfo.publisher
    Book.Title = googleBook.volumeInfo.title
    if (googleBook.volumeInfo.subtitle) Book.Title += ': ' + googleBook.volumeInfo.subtitle
    Book.Authors = googleBook.volumeInfo.authors.join(', ')
    if (googleBook.volumeInfo.industryIdentifiers) {
      googleBook.volumeInfo.industryIdentifiers.forEach(objID => {
        if (objID.type === 'ISBN_10') Book.ISBN10 = objID.identifier
        if (objID.type === 'ISBN_13') Book.ISBN13 = objID.identifier
      })
    }
    if (googleBook.volumeInfo.imageLinks) Book.ThumbnailURL = googleBook.volumeInfo.imageLinks.thumbnail
  }
  if (googleBook.saleInfo
    && googleBook.saleInfo.retailPrice
    && googleBook.saleInfo.retailPrice.currencyCode === 'USD') {
    Book.RetailPrice = googleBook.saleInfo.retailPrice.amount
  } else {
    Book.RetailPrice = 0
  }

  return Book
}

async function cacheBook(book) {
  bookModel
    .create({
      BookID: book.BookID,
      CacheDate: Date.now(),
      PublishYear: book.PublishYear,
      Publisher: book.Publisher,
      Title: book.Title,
      Authors: book.Authors,
      ISBN10: book.ISBN10,
      ISBN13: book.ISBN13,
      RetailPrice: book.RetailPrice,
      ThumbnailURL: book.ThumbnailURL
    })
}

controller.getListings = (request, response) => {
  let where = {},
    hasFilter = false,
    include = []

  if (request.body.Title !== '') {
    hasFilter = true
    where.Title = { [Op.like]: '%' + request.body.Title + '%' }
  }
  if (request.body.ISBN !== '') {
    hasFilter = true
    where[[Op.or]] = {
      ISBN10: { [Op.like]: '%' + request.body.ISBN + '%' },
      ISBN13: { [Op.like]: '%' + request.body.ISBN + '%' }
    }
  }

  if (hasFilter) {
    include.push({
      model: bookModel,
      where: where
    })
  }

  listingModel
    .findAll({ include: include })
    .then((listings) => (response.json(listings)))
    .catch(() => (response.status(500).send('Sorry, something went wrong')))
}

controller.doListingCreate = (request, response) => {
  if (!request.body.BookID
    || !request.body.AskingPrice) {
    return response.status(400).send('Error: invalid input - please fill in all fields')
  }

  listingModel
    .create({
      AccountID: request.session.passport.user,
      BookID: request.body.BookID,
      AskingPrice: request.body.AskingPrice
    })
    .then(() => (response.send('Success: listing created successfully')))
    .catch(() => (response.status(400).send('Error: cannot create listing')))
}

controller.doListingRemove = (request, response) => {
  if (!request.body.BookListingID) return response.status(400).send('Error: invalid input - please specify a book listing by ID')

  listingModel
    .destroy({
      where: {
        AccountID: request.session.passport.user,
        BookListingID: request.body.BookListingID
      }
    })
    .then((destroyCount) => {
      // early return if nothing was removed
      if (!destroyCount) return response.status(400).send('Error: cannot remove listing')

      response.send('Success: listing created successfully')
    })
    .catch(() => (response.status(500).send('Sorry, something went wrong')))
}

controller.getBookByID = (request, response) => {
  bookModel
    .findByPk(request.params.BookID)
    .then((book) => {
      // early return if no book is found
      if (!book) return response.status(400).send('Error: no book by ID')

      response.json(book)
    })
    .catch(() => (response.status(500).send('Sorry, something went wrong')))
}

controller.getBookByISBN = (request, response) => {
  bookModel
    .findOne({
      where: {
        [Op.or]: {
          ISBN10: request.body.ISBN,
          ISBN13: request.body.ISBN
        }
      }
    })
    .then((book) => {
      // early return if a book is found
      if (book) return response.json(book)

      const URI = `https://www.googleapis.com/books/v1/volumes?q=isbn:${ request.body.ISBN }&key=${ keys.google.apiKey }`
      // otherwise fetch and cache a new book from the Google Books API
      axios
        .get(URI, { responseType: 'json' })
        .then((data) => {
            if (data && data.data.items) {
              let book = transformBook(data.data.items[0])

              cacheBook(book)
              response.json(book)
            } else {
              response.status(400).send('Error: no book by ISBN')
            }
        })
        .catch(() => (response.status(500).send('Sorry, something went wrong')))
    })
    .catch(() => (response.status(500).send('Sorry, something went wrong')))
}

module.exports = controller
