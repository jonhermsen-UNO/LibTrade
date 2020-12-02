const accountModel = require('../models/accountMod')
const collegeModel = require('../models/collegeMod')
const listingModel = require('../models/listingMod')
const passport = require('passport')
const controller = {}

//gets listing form to create listing
 /*controller.createListing = function(req, res){
   res.send("createListing not yet implemented (GET)");
 };*/

 //gets listing from db to view listing
controller.viewListing = function(req, res){
  listingModel.findOne({where:{bookID: req.body.bookID}}).then(
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
    bookID: req.body.bookID,
    price: req.body.price,
    user_id: req.body.user_id
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

module.exports = controller
