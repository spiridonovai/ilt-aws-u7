var express = require('express')
var mysql = require('mysql')

var app = express()

var path = require('path')
app.use('/Scripts', express.static(path.join(__dirname + '/Scripts')));

var connection = mysql.createConnection({
  host: 'db.c76o0nb7ihuq.eu-central-1.rds.amazonaws.com',
  user: 'iSpiridonova',
  password: 'iSpiridonova',
  database: 'db'
});

connection.connect();



app.get('/login', function(req, res){
  res.sendFile(__dirname + '/Views/login.html');
})
 
app.get('/', function (req, res) {
  res.send('Hello lgflf')
})

app.get('/name/:name', function (req, res) {
  res.send('Hello ' + req.params.name)
})
app.get('/charts', function (req, res) {
  res.sendFile(__dirname + '/Views/charts.html');
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
