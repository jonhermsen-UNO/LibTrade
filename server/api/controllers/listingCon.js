const accountModel = require('../models/account')
const collegeModel = require('../models/college')
const listingModel = require('../models/listingMod')
const passport = require('passport')
const controller = {}

//gets listing form to create listing
 controller.createListing = function(req, res){
   res.send("createListing not yet implemented (GET)");
 };

 //gets listing from db to view listing
controller.viewListing = function(req, res){
  res.send("viewListing not yet implemented (GET)");
};

//posts listing made with listing form to db
controller.postListing = function(req, res){
  res.send("viewListing not yet implemented (POST)");
};

//posts removal request for listing, listing is removed from db
controller.removeListing = function(req, res){
  res.send("viewListing not yet implemented (POST)");
};
