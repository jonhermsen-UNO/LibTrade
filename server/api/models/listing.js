const model = {}

const BookListing = [{
  "BookListingID": 1,
  "AccountID": 1,
  "BookID": "Lj-4ZUY4QQsC",
  "AskingPrice": 15.00
}, {
  "BookListingID": 2,
  "AccountID": 1,
  "BookID": "uuAZAQAAIAAJ",
  "AskingPrice": 100.00
}, {
  "BookListingID": 3,
  "AccountID": 2,
  "BookID": "uuAZAQAAIAAJ",
  "AskingPrice": 120.00
}, {
  "BookListingID": 4,
  "AccountID": 3,
  "BookID": "Lj-4ZUY4QQsC",
  "AskingPrice": 12.00
}, {
  "BookListingID": 5,
  "AccountID": 4,
  "BookID": "3sdUewAACAAJ",
  "AskingPrice": 65.00
}, {
  "BookListingID": 6,
  "AccountID": 4,
  "BookID": "uuAZAQAAIAAJ",
  "AskingPrice": 150.00
}]

model.getListings = () => {
  return new Promise((resolve, reject) => {
    resolve(BookListing)
  })
}

module.exports = model
