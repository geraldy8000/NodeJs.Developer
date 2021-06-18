const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const mysql = require('mysql');


const app = express();
const connection = mysql.createConnection({
  host: 'freedb.tech',
  user: 'freedbtech_geraldy',
  password: 'dbpassword',
  database: 'freedbtech_apiRequest'
});

const apikey = 'faf7e5bb';
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({message: "Hello"});
  
});

app.get("/search", (req, res) => {
  var query = req.query.query;
  var page = req.query.page;
  request('http://www.omdbapi.com/?apikey='+apikey+'&s='+query+'&page='+page, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      res.send(response.body);

      var params = query + "," + page
      var endpoint = 'http://www.omdbapi.com/?apikey='+apikey+'&s='+query+'&page='+page;

      var tzoffset = (new Date()).getTimezoneOffset() * 60000;
      var dateString = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).replace('T', ' ');

      var sql = "INSERT INTO apiCalls (timestamp, endpoint, parameters) VALUES ('"+dateString+"', '"+endpoint+"', '"+params+"')";  
      connection.query(sql, function (err, result) {  
        if (err) throw err;  
        console.log("1 record inserted");  
      });  
    }
  });
  
});

app.get("/detail", (req, res) => {
  var title = req.query.title;
  request('http://www.omdbapi.com/?apikey='+apikey+'&t='+title, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body);


      var params = title
      var endpoint = 'http://www.omdbapi.com/?apikey='+apikey+'&t='+title;
      
      var tzoffset = (new Date()).getTimezoneOffset() * 60000;
      var dateString = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).replace('T', ' ');

      var sql = "INSERT INTO apiCalls (timestamp, endpoint, parameters) VALUES ('"+dateString+"', '"+endpoint+"', '"+params+"')";  
      connection.query(sql, function (err, result) {  
        if (err) throw err;  
        console.log("1 record inserted");  
      });  
      
    }
  });
  
});


var port_number = Number(process.env.PORT || 3000);
app.listen(port_number, () => {
  console.log("Server is running on port "+ port_number + " .");
});