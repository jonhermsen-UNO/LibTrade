const model = {}

model.id = ''
model.bookID = ''
model.price = ''
model.userID = ''

model.updateID = (id) => {
  model.id = id
}

model.updateBookID = (id) => {
    model.bookID = id
}

model.updatePrice = (price) => {
    model.price = price
}

model.updateUserID = (id) => {
    model.userID = id
}


module.exports = model