const { Sequelize, DataTypes } = require('sequelize')
const db = require('../../lib/dbconn')
const sequelize = new Sequelize(db)

const model = sequelize.define('Book', {
  BookID: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  CacheDate: DataTypes.DATE,
  PublishYear: DataTypes.SMALLINT,
  Publisher: DataTypes.STRING,
  Title: DataTypes.STRING,
  Authors: DataTypes.STRING,
  ISBN10: DataTypes.STRING,
  ISBN13: DataTypes.STRING,
  RetailPrice: DataTypes.DECIMAL,
  ThumbnailURL: DataTypes.STRING
}, {
  tableName: 'BookCache'
});

module.exports = model
