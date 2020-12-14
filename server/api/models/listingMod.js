const bookModel = require('./bookMod')
const { Sequelize, DataTypes } = require('sequelize')
const db = require('../../config/database')
const sequelize = new Sequelize(db)

const model = sequelize.define('BookListing', {
  BookListingID:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  AccountID: DataTypes.INTEGER,
  BookID: DataTypes.STRING(20),
  AskingPrice: DataTypes.DECIMAL(6,2)
},{
  timestamps: false,
  tableName: 'BookListing'
})

model.belongsTo(bookModel, {
  through: model,
  foreignKey: 'BookID',
  // expose the relationship to Sequelize, but do
  // not create the relationship in the database
  constraints: false
})

module.exports = model
