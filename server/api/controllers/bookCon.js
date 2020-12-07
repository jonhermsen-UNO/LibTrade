const passport = require('passport')
const axios = require('axios');
const keys = require('../../config/keys');
const controller = {}

//Finds book from google books api by book id
controller.findBookById = (req, res) => {
    const URI = `https://www.googleapis.com/books/v1/volumes/${req.body.searchQuery}`;
    axios.default.get(URI, {responseType: "json", method:"get"}).then((data) => {
        res.send(data.data); 
        //TODO: Still need to format it into a book object
    }).catch((err) => {
        console.log(err);
        res.send(`Error: ${err}`)
    })

}
//Searchs for book with name matching search query.
//Returns book array where searchquery exists in name anywhere
controller.searchBookByName = (req, res) => {
    const URI = `https://www.googleapis.com/books/v1/volumes?q=${req.body.searchQuery}`;
    axios.default.get(URI, {responseType: "json", method:"get"}).then((data) => {
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

module.exports = controller;