const { Sequelize, DataTypes } = require('sequelize')
const db = require('../../config/database')
const sequelize = new Sequelize(db)

const model = sequelize.define('Book', {
  BookID: {
    type: DataTypes.STRING(20),
    primaryKey: true
  },
  CacheDate: DataTypes.DATEONLY,
  PublishYear: DataTypes.SMALLINT,
  Publisher: DataTypes.STRING(200),
  Title: DataTypes.STRING(200),
  Authors: DataTypes.STRING(200),
  ISBN10: DataTypes.STRING(10),
  ISBN13: DataTypes.STRING(13),
  RetailPrice: DataTypes.DECIMAL(6,2),
  ThumbnailURL: DataTypes.STRING(300)
}, {
  timestamps: false,
  tableName: 'Book'
});

module.exports = model
