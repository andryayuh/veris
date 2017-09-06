var express = require('express');
var Promise = require('bluebird');
var fs = require('fs');
var json = require('./loadJSON'); 
var readFile = Promise.promisify(fs.readFile);

var app = express();

app.use(express.static(__dirname + '/react-client/dist'));

var n = process.argv[2];

// run loadJSON.js to dump n latest incidents to latest-incidents.json
json(n);

app.get('/incidents', (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  readFile('./latest-incidents.json', 'utf-8')
    .then((content) => {
      res.end(content); 
    }).catch(err => { console.log(err); });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

