var mysql =require('mysql')

var connection = {
    database: 'libTradeDB',
    username:'user',
    password: 'Enough1!',
    dialect: 'mysql',
    host: 'ec2-3-19-58-103.us-east-2.compute.amazonaws.com'

};

module.exports = connection;