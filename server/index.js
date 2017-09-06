var express = require('express');
// var bodyParser = require('body-parser');
var Promise = require('bluebird');
var fs = require('fs');
var json = require('../loadJSON'); 
var readFile = Promise.promisify(fs.readFile);

var app = express();

app.use(express.static('./'));

var n = process.argv[2];
json(n);

app.get('/incidents', (req, res) => {
// if (req.method === 'GET' && req.url === '/transactions') {
  res.writeHead(200, {'Content-Type': 'application/json'});
  readFile('./latest-incidents.json', 'utf-8')
    .then((content) => {
      console.log('!!!!!', content);
      res.end(content); 

    }); 

});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

