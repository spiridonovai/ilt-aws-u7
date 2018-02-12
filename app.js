var express = require('express')
var mysql = require('mysql')

var app = express()

var connection = mysql.createConnection({
  host: 'db.c76o0nb7ihuq.eu-central-1.rds.amazonaws.com',
  user: 'iSpiridonova',
  password: 'iSpiridonova',
  database: 'db'
});

connection.connect();


 
app.get('/', function (req, res) {
  res.send('Hello lgflf')
})

app.get('/name/:name', function (req, res) {
  res.send('Hello ' + req.params.name)
})

app.get('/test', function(req,res){
  connection.query('SELECT * FROM Grade', function (error, results, fields) {
    if (error){
      res.statusCode = 500;
      res.send(error);
    }
    res.send(results);
    res.end();
  });
})
 
app.listen(8081)
