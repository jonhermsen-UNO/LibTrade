const accountModel = require('../models/accountMod')
const collegeModel = require('../models/collegeMod')
const listingModel = require('../models/listingMod')
const axios = require('axios').default;
const keys = require('../../config/keys');
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
  if (obj.saleInfo &&
      obj.saleInfo.retailPrice &&
      obj.saleInfo.retailPrice.currencyCode === "USD") {
    Book.RetailPrice = obj.saleInfo.retailPrice.amount
  } else {
    Book.RetailPrice = 0
  }
  return Book
}

//gets listing form to create listing
 /*controller.createListing = function(req, res){
   res.send("createListing not yet implemented (GET)");
 };*/

  //gets listing from db to view listing
  controller.viewListing = function(req, res){
    let where = {};
    if(req.body.ISBN10 ||  req.body.ISBN13) where.BookID = this.findBookByISBN(req.body.ISBN, res).BookID;
    else if (req.body.BookID) where.BookID = req.body.BookID;
    if (req.body.AskingPrice) where.AskingPrice = req.body.AskingPrice;
  
    listingModel.findAll({
      where: where
    }).then((listings) => {
      if (!listings) return res.status(401).send('no listing available')
      return res.json(listings)
    })
  };


//posts listing made with listing form to db
controller.postListing = function(req, res){
  listingModel.create({
    AccountID: req.body.AccountID,
    BookID: req.body.BookID,
    AskingPrice: req.body.AskingPrice
  }).then((posted) => {
      if(posted){
        return res.send(posted);
      }
      else{
        return res.status(401).send('unable to create listing');
      }
    }
  )
};

//posts removal request for listing, listing is removed from db
controller.removeListing = function(req, res){
  listingModel.destroy({
    where:{
      AccountID: req.body.AccountID,
      BookID: req.body.BookID,
      AskingPrice: req.body.AskingPrice
    }}).then(
      function(destroyed){
        if(destroyed){
          return res.send(destroyed);
        }
        else{
          return res.status(401).send("unable to remove listing");
        }

      }
    )
};


//=========BOOKS=========

//Finds book from google books api by book id
controller.findBookById = (req, res) => {
  const URI = `https://www.googleapis.com/books/v1/volumes/${req.params.BookID}`;
  axios.get(URI, {responseType: "json", method:"get"}).then((data) => {
    // TODO: use cache-only approach
    res.send(transformBook(data.data))
  }).catch((err) => {
      console.log(err);
      res.send(`Error: ${err}`)
  })

}
//Searchs for book with name matching search query.
//Returns book array where searchquery exists in name anywhere
controller.findBookByISBN = (req, res) => {
  // TODO: use cache-first approach
  const URI = `https://www.googleapis.com/books/v1/volumes?q=isbn:${req.body.ISBN}&key=${ keys.google.apiKey }`;
  axios.get(URI, {responseType: "json", method:"get"}).then((data) => {
      if (!data.data.items) {
        res.status(400).send("No book by ISBN")
      } else {
        res.send(transformBook(data.data.items[0]))
      }
  }).catch((err) => {
      res.send(`Error: ${err}`)
  });
}







module.exports = controller
