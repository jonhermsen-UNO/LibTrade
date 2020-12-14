const { Sequelize, DataTypes } = require('sequelize')
const db = require('../../config/database')
const sequelize = new Sequelize(db)

const model = sequelize.define('College', {
  CollegeID: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  Name: DataTypes.STRING(200),
  Address: DataTypes.STRING(150),
  City: DataTypes.STRING(50),
  State: DataTypes.STRING(2),
  ZIP: DataTypes.STRING(5)
}, {
  timestamps: false,
  tableName: 'College'
})

module.exports = model
