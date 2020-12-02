const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../lib/dbconn')
const sequelize = new Sequelize(db);
const model = sequelize.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  collegeID: DataTypes.STRING
});

module.exports = model