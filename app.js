var express = require('express')
var app = express()
var connection = require('./connect')
var path = require('path')
app.use('/Scripts', express.static(path.join(__dirname + '/Scripts')));

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

app.get('/api/months', function(req, res) {
  connection.query("SELECT MESECI OD TABELA", function (error, results, fields) {
    if (error) {
      res.statusCode = 500;
      res.send(error);
    }
    res.send(results);
    res.end();
  });
})

app.listen(8081)
