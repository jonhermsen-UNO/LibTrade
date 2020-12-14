const { Op } = require('sequelize')
const listingModel = require('../models/listingMod')
const bookModel = require('../models/bookMod')
const keys = require('../../config/keys');
const axios = require('axios').default;
const controller = {}

// Transform Google Book data to match the LibTrade schema
function transformBook(googleBook) {
  const Book = {}
  Book.BookID = googleBook.id
  if (googleBook.volumeInfo) {
    Book.PublishYear = parseInt(googleBook.volumeInfo.publishedDate.substring(0, 4) , 10)
    Book.Publisher = googleBook.volumeInfo.publisher
    Book.Title = googleBook.volumeInfo.title
    if (googleBook.volumeInfo.subtitle) Book.Title += ": " + googleBook.volumeInfo.subtitle
    Book.Authors = googleBook.volumeInfo.authors.join(", ")
    if (googleBook.volumeInfo.industryIdentifiers) {
      googleBook.volumeInfo.industryIdentifiers.forEach(objID => {
        if (objID.type === "ISBN_10") Book.ISBN10 = objID.identifier
        if (objID.type === "ISBN_13") Book.ISBN13 = objID.identifier
      })
    }
    if (googleBook.volumeInfo.imageLinks) Book.ThumbnailURL = googleBook.volumeInfo.imageLinks.thumbnail
  }
  if (googleBook.saleInfo
      && googleBook.saleInfo.retailPrice
      && googleBook.saleInfo.retailPrice.currencyCode === "USD") {
    Book.RetailPrice = googleBook.saleInfo.retailPrice.amount
  } else {
    Book.RetailPrice = 0
  }
  return Book
}

async function cacheBook(book) {
  bookModel.create({
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
  let where = {};
  if(request.body.ISBN10 ||  request.body.ISBN13) where.BookID = this.getBookByISBN(request.body.ISBN, response).BookID;
  else if (request.body.BookID) where.BookID = request.body.BookID;
  if (request.body.AskingPrice) where.AskingPrice = request.body.AskingPrice;

  listingModel.findAll({
    where: where
  }).then((listings) => {
    if (!listings) return response.status(400).send('no listing available')
    return response.json(listings)
  })
}

controller.doListingCreate = (request, response) => {
  if (!request.session
    || !request.session.passport
    || !request.session.passport.user) {
    return response.status(403).send('The user is not authenticated')
  }

  listingModel
    .create({
      AccountID: request.session.passport.user,
      BookID: request.body.BookID,
      AskingPrice: request.body.AskingPrice
    }).then((posted) => {
        if (posted) {
          return response.send(posted);
        } else {
          return response.status(400).send('unable to create listing');
        }
      }
    )
}

controller.doListingRemove = (request, response) => {
  listingModel.destroy({
    where:{
      AccountID: request.body.AccountID,
      BookID: request.body.BookID,
      AskingPrice: request.body.AskingPrice
    }}).then(
      function(destroyed){
        if(destroyed){
          return response.send('Listing removed successfully!');
        }
        else{
          return response.status(400).send("unable to remove listing");
        }

      }
    )
};

//=========BOOKS=========

controller.getBookByID = (request, response) => {
  bookModel.findByPk(request.params.BookID)
  .then((book) => {
    if (!book) {
      response.status(400).send('No book by ID')
    } else {
      response.json(book)
    }
  })
}

controller.getBookByISBN = (request, response) => {
  bookModel.findOne({
    where: {
      [Op.or]: {
        ISBN10: request.body.ISBN,
        ISBN13: request.body.ISBN
      }
    }
  })
  .then((book) => {
    if (!book) {
      // fetch and cache a new book from the Google Books API
      const URI = `https://www.googleapis.com/books/v1/volumes?q=isbn:${ request.body.ISBN }&key=${ keys.google.apiKey }`;
      axios.get(URI, { responseType: "json", method:"get" }).then((data) => {
          if (!data || !data.data.items) {
            response.status(400).send("No book by ISBN")
          } else {
            book = transformBook(data.data.items[0])
            cacheBook(book)
            response.send(book)
          }
      }).catch((err) => {
          response.send(`Error: ${err}`)
      });
    } else {
      response.send(book)
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

module.exports = controller
