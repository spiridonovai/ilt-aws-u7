var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'db.c76o0nb7ihuq.eu-central-1.rds.amazonaws.com',
    user: 'iSpiridonova',
    password: 'iSpiridonova',
    database: 'db'
  });

  module.exports = connection;