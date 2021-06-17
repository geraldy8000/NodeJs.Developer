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
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/search", (req, res) => {
  var query = req.query.query;
  var page = req.query.page;
  request('http://www.omdbapi.com/?apikey=faf7e5bb&s='+query+'&page='+page, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body);

      // var dateString = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"}).slice(0, 19).replace('T', ' ');
      var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      var dateString = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).replace('T', ' ');

      var sql = "INSERT INTO apiCalls (timestamp, endpoint, parameters) VALUES ('"+dateString+"', 'search', '"+query+"')";  
      connection.query(sql, function (err, result) {  
        if (err) throw err;  
        console.log("1 record inserted");  
      });  
    }
  });
  
});

app.get("/detail", (req, res) => {
  var title = req.query.title;
  request('http://www.omdbapi.com/?apikey=faf7e5bb&t='+title, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(response.body); // Show the HTML for the Google homepage. 
      res.send(response.body);
    }
  });
  
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});