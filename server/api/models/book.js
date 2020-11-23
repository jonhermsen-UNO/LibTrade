const model = {}

bookShelf = [{
  "BookID": "Lj-4ZUY4QQsC",
  "CacheDate": "2020-11-18",
  "PublishYear": 2005,
  "Publisher": "Cengage Learning",
  "Title": "Calculus",
  "Author": "Ron Larson, Robert P. Hostetler, Bruce Edwards",
  "ISBN10": "061850298X",
  "ISBN13": "9780618502981",
  "RetailPrice": 11.96,
  "ThumbnailURL": "http://books.google.com/books/content?id=Lj-4ZUY4QQsC&printsec=frontcover&img=1&zoom=5&imgtk=AFLRE70U7uwiOHyivwG_3UD03irs0EZ1HHMk6jfwpL46PsE8Zedm7HXnMiA808yeGnrfIA0mlyXODI_mVrfOmv5-CYWAVG5jinYcUrOcJYw1Rg7QbFz1bjzyVUS6C63QMKwzjSqQJp5m&source=gbs_api",
}, {
  "BookID": "uuAZAQAAIAAJ",
  "CacheDate": "2020-11-23",
  "PublishYear": 2007,
  "Publisher": "Prentice Hall",
  "Title": "Graph Theory: Modeling, Applications, and Algorithms",
  "Author": "Geir Agnarsson, Raymond Greenlaw",
  "ISBN10": "0131423843",
  "ISBN13": "9780131423848",
  "RetailPrice": 119.99,
  "ThumbnailURL": "http://books.google.com/books/content?id=uuAZAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
}, {
  "BookID": "3sdUewAACAAJ",
  "CacheDate": "2020-11-23",
  "PublishYear": 2011,
  "Publisher": "Addison-Wesley Longman",
  "Title": "Advanced Visual Basic 2010",
  "Author": "Kip R. Irvine, Tony Gaddis",
  "ISBN10": "0132316749",
  "ISBN13": "9780132316743",
  "RetailPrice": 63.49,
  "ThumbnailURL": "http://books.google.com/books/content?id=3sdUewAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
}]

model.getBook = (id) => {
  bookShelf.forEach((book) => {
    if (book.BookID === id)
    return book;
  });
}

module.exports = model
