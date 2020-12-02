const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../lib/dbconn')
const sequelize = new Sequelize(db);
const model = sequelize.define('Listing', {
  bookID: DataTypes.STRING,
  price: DataTypes.STRING,
  user_id: DataTypes.STRING
},{
  timestamps: false
});

module.exports = model

/*model.updateID = (id) => {
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
}*/


module.exports = model