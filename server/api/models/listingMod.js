const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../lib/dbconn')
const sequelize = new Sequelize(db);
const model = sequelize.define('BookListing', {
  BookListingID:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  AccountID: {
    type: DataTypes.INTEGER,
    defaultValue: -1 
  },
  BookID: DataTypes.STRING,
  AskingPrice: DataTypes.DECIMAL(6,2)
},{
  timestamps: false,
  tableName: 'BookListing'
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