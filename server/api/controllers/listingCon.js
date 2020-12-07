const accountModel = require('../models/accountMod')
const collegeModel = require('../models/collegeMod')
const listingModel = require('../models/listingMod')
const passport = require('passport')
const axios = require('axios').default;
const controller = {}

//gets listing form to create listing
 /*controller.createListing = function(req, res){
   res.send("createListing not yet implemented (GET)");
 };*/

 //gets listing from db to view listing
controller.viewListing = function(req, res){
  listingModel.findOne({
    where:{
      AccountID: req.body.AccountID,
      BookID: req.body.BookID,
      AskingPrice: req.body.AskingPrice
    }}).then(
    function(listing){
      if(listing){
        return res.send(listing);
      }
      else{
        return res.send('no listing available');
      }
    }
  )
};

//posts listing made with listing form to db
controller.postListing = function(req, res){
  listingModel.create({
    AccountID: req.body.AccountID,
    BookID: req.body.BookID,
    AskingPrice: req.body.AskingPrice
  }).then(
    function(posted){
      if(posted){
        return res.send(posted);
      }
      else{
        return res.send('unable to create listing');
      }
    }
  )
};

//posts removal request for listing, listing is removed from db
controller.removeListing = function(req, res){
  res.send("viewListing not yet implemented (POST)");
};


//=========BOOKS=========

//Finds book from google books api by book id
controller.findBookById = (req, res) => {
  const URI = `https://www.googleapis.com/books/v1/volumes/${req.params.BookID}`;
  axios.get(URI, {responseType: "json", method:"get"}).then((data) => {
      res.send(data.data); 
      //TODO: Still need to format it into a book object
  }).catch((err) => {
      console.log(err);
      res.send(`Error: ${err}`)
  })

}
//Searchs for book with name matching search query.
//Returns book array where searchquery exists in name anywhere
controller.findBookByISBN = (req, res) => {
  const URI = `https://www.googleapis.com/books/v1/volumes?q=isbn:${req.body.ISBN}`;
  axios.get(URI, {responseType: "json", method:"get"}).then((data) => {
      res.send(data.data.items);
      //TODO: Still need to format it into a book object
  }).catch((err) => {
      res.send(`Error: ${err}`)
  });
}

//keys.google.apiKey is not being used here due to 503 error
//It still works but I'll look into it.
//The key would be appended at the end of the URI:
//  &key=API KEY HERE

module.exports = controller
