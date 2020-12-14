const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../lib/dbconn')
const sequelize = new Sequelize(db);
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
});

module.exports = model
