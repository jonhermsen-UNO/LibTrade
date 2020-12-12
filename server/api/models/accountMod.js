const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../lib/dbconn')
const sequelize = new Sequelize(db);

const model = sequelize.define('Account', {
  AccountID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  CollegeID: DataTypes.INTEGER,
  Username: DataTypes.STRING,
  Password: DataTypes.STRING,
  Email: DataTypes.STRING,
}, {
  timestamps: false,
  tableName: 'Account'
});

module.exports = model
