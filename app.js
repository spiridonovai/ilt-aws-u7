var express = require('express')
var app = express()
var connection = require('./connect')
var path = require('path')
app.use('/Scripts', express.static(path.join(__dirname + '/Scripts')));

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   next();
// });

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

app.get('/api/member/team', function(req, res){
  connection.query('SELECT * FROM Team', function(error, results, fields){
    if (error){
      res.statusCode = 500;
      res.send(error);
    }
    res.end(JSON.stringify(results));
  });
})

app.get('/api/member/team/:id', function(req, res){
  var q = 'SELECT * FROM User AS u JOIN UserTeam AS ut ON u.id=ut.FK_USER WHERE ut.FK_TEAM=?'
  connection.query(q, [req.params.id], function(error, results, fields){
    if (error){
      res.statusCode = 500;
      res.send(error);
    }
    res.send(results);
  });
})

app.get('/api/member/team/:teamId/questions', function(req, res){
  var q = 'SELECT * FROM Questions WHERE FK_TEAM=?'
  connection.query(q, [req.params.teamId], function(error, results, fields){
    if (error){
      res.statusCode = 500;
      res.send(error);
    }
    res.send(results);
  });
})

app.post('/api/member/post', function(req, res){
  var postData = JSON.stringify(req.body);
  var str = JSON.parse(postData);
  // if (error){
  //   res.statusCode = 500;
  //   res.send(error);
  // }
// prvoto value od jsonot shto ke mi go prati da bide kolku prasanja sledat!!!!!!!!!
  console.log(str)
  res.send(postData);
})

//7 irena
//8 nikola
//9 davor
//10 team lead

//site korisnici za eden tim
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

//site prashanja za eden tim
app.get('/api/questions/:team', function(req, res) {
  connection.query(`SELECT * FROM Questions WHERE FK_TEAM = ${req.params.team}`,
   function (error, results, fields) {
    if (error) {
      res.statusCode = 500;
      res.send(error);
    }
    var arr = JSON.parse(JSON.stringify(results));
    console.log(arr.map(a => a.question.toString()));
    res.send(results);
    res.end();
  });
})

/************ nisho ne e testirano ************************/

// app.get('/api/:date/:team', function(req, res) {
//   connection.query(`SELECT * FROM Vote WHERE EXTRACT(MONTH FROM date) = ${req.params.date} AND FK_TEAM = ${req.params.team}`,
//    function (error, results, fields) {
//     if (error) {
//       res.statusCode = 500;
//       res.send(error);
//     }
//     var arr = JSON.parse(JSON.stringify(results));
//     var grades = arr.map(a => a.FK_GRADE);
//     var questions = arr.map(a => a.FK_QUESTION.toString());   //ako se cuvaat kako stringovi direktno, ako ne 
//     var sum = 0;
//     for (grade in grades) {
//       sum += grade;
//     }
//     var avg = sum / grades.length;
//     console.log(avg);
//     console.log(questions);
//     res.send(results);
//     res.end();
//   });
// })

app.listen(8081)



