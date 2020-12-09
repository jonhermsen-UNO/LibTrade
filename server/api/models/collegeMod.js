const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../lib/dbconn')
const sequelize = new Sequelize(db);
const model = sequelize.define('College',{
  CollegeID:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Address: DataTypes.STRING,
  City: DataTypes.STRING,
  State: DataTypes.STRING,
  Zip: DataTypes.STRING
})

module.exports = model