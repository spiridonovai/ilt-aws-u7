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


//7 irena
//8 nikola
//9 davor
//10 team lead

app.get('/api/members/:team', function(req, res) {
  connection.query(`SELECT * FROM UserTeam WHERE FK_TEAM = ${req.params.team}`,
   function (error, results, fields) {
    if (error) {
      res.statusCode = 500;
      res.send(error);
    }
    var arr = JSON.parse(JSON.stringify(results));
    console.log(arr.map(a => a.FK_USER));
    res.send(results);
    res.end();
  });
})

/************ nisho ne e testirano ************************/

// app.get('/api/:date', function(req, res) {
//   connection.query(`SELECT * FROM Vote WHERE EXTRACT(MONTH FROM date) = ${req.params.date}`,
//    function (error, results, fields) {
//     if (error) {
//       res.statusCode = 500;
//       res.send(error);
//     }
//     var arr = JSON.parse(JSON.stringify(results));
//     var grades = arr.map(a => a.FK_GRADE);
//     var questions = arr.map(a => a.FK_QUESTION.toString());
//     var sum = 0;
//     for (grade in grades) {
//       sum += grade;
//     }
//     console.log(sum);
//     console.log(questions);
//     res.send(results);
//     res.end();
//   });
// })

app.listen(8081)
