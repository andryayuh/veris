var express = require('express');
// var bodyParser = require('body-parser');
var fs = require('fs');
var json = require('../loadJSON'); 

var app = express();

app.use(express.static('./'));

json();

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

