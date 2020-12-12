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
