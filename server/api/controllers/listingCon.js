const { Op } = require('sequelize')
const listingModel = require('../models/listingMod')
const bookModel = require('../models/bookMod')
const keys = require('../../config/keys');
const axios = require('axios').default;
const controller = {}

// Transform Google Book data to match the LibTrade schema
function transformBook(obj) {
  const Book = {}
  Book.BookID = obj.id
  if (obj.volumeInfo) {
    Book.PublishYear = parseInt(obj.volumeInfo.publishedDate.substring(0, 4) , 10)
    Book.Publisher = obj.volumeInfo.publisher
    Book.Title = obj.volumeInfo.title
    if (obj.volumeInfo.subtitle) Book.Title += ": " + obj.volumeInfo.subtitle
    Book.Authors = obj.volumeInfo.authors.join(", ")
    if (obj.volumeInfo.industryIdentifiers) {
      obj.volumeInfo.industryIdentifiers.forEach(objID => {
        if (objID.type === "ISBN_10") Book.ISBN10 = objID.identifier
        if (objID.type === "ISBN_13") Book.ISBN13 = objID.identifier
      })
    }
    if (obj.volumeInfo.imageLinks) Book.ThumbnailURL = obj.volumeInfo.imageLinks.thumbnail
  }
  if (obj.saleInfo
      || obj.saleInfo.retailPrice
      || obj.saleInfo.retailPrice.currencyCode === "USD") {
    Book.RetailPrice = obj.saleInfo.retailPrice.amount
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

controller.viewListing = (req, res) => {
  let where = {};
  if(req.body.ISBN10 ||  req.body.ISBN13) where.BookID = this.findBookByISBN(req.body.ISBN, res).BookID;
  else if (req.body.BookID) where.BookID = req.body.BookID;
  if (req.body.AskingPrice) where.AskingPrice = req.body.AskingPrice;

  listingModel.findAll({
    where: where
  }).then((listings) => {
    if (!listings) return res.status(400).send('no listing available')
    return res.json(listings)
  })
}

controller.postListing = (req, res) => {
  if (!req.session
    || !req.session.passport
    || !req.session.passport.user) {
    return res.status(403).send('The user is not authenticated')
  }

  listingModel
    .create({
      AccountID: req.session.passport.user,
      BookID: req.body.BookID,
      AskingPrice: req.body.AskingPrice
    }).then((posted) => {
        if (posted) {
          return res.send(posted);
        } else {
          return res.status(400).send('unable to create listing');
        }
      }
    )
}

controller.removeListing = (req, res) => {
  listingModel.destroy({
    where:{
      AccountID: req.body.AccountID,
      BookID: req.body.BookID,
      AskingPrice: req.body.AskingPrice
    }}).then(
      function(destroyed){
        if(destroyed){
          return res.send('Listing removed successfully!');
        }
        else{
          return res.status(400).send("unable to remove listing");
        }

      }
    )
};

//=========BOOKS=========

controller.findBookById = (req, res) => {
  bookModel.findOne({
    where: { BookID: req.params.BookID }
  })
  .then((book) => {
    if (!book) {
      res.status(400).send('No book by ID')
    } else {
      res.json(book)
    }
  })
}

controller.findBookByISBN = (req, res) => {
  bookModel.findOne({
    where: {
      [Op.or]: {
        ISBN10: req.body.ISBN,
        ISBN13: req.body.ISBN
      }
    }
  })
  .then((book) => {
    if (!book) {
      // fetch and cache a new book from the Google Books API
      const URI = `https://www.googleapis.com/books/v1/volumes?q=isbn:${ req.body.ISBN }&key=${ keys.google.apiKey }`;
      axios.get(URI, { responseType: "json", method:"get" }).then((data) => {
          if (!data || !data.data.items) {
            res.status(400).send("No book by ISBN")
          } else {
            book = transformBook(data.data.items[0])
            cacheBook(book)
            res.send(book)
          }
      }).catch((err) => {
          res.send(`Error: ${err}`)
      });
    } else {
      res.send(book)
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

module.exports = controller
