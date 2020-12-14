const { Sequelize, DataTypes } = require('sequelize')
const db = require('../../config/database')
const sequelize = new Sequelize(db)

const model = sequelize.define('Account', {
  AccountID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  CollegeID: DataTypes.INTEGER,
  Email: {
    type: DataTypes.STRING(254),
    unique: true
  },
  Username: {
    type: DataTypes.STRING(60),
    unique: true
  },
  Password: DataTypes.STRING(60),
}, {
  timestamps: false,
  tableName: 'Account'
})

module.exports = model
