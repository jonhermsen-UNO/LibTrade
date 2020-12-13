const { Sequelize, DataTypes } = require('sequelize')
const db = require('../../lib/dbconn')
const sequelize = new Sequelize(db)

const model = sequelize.define('College', {
  CollegeID: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING,
    
  },
  Address: DataTypes.STRING,
  City: DataTypes.STRING,
  State: DataTypes.STRING,
  Zip: DataTypes.STRING
}, {
  timestamps: false,
  tableName: 'College'
});

module.exports = model
