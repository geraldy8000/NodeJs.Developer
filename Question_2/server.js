const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');


const app = express();

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
      console.log(response.body); // Show the HTML for the Google homepage. 
      res.send(response.body);
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