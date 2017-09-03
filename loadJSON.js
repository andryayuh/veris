var fs = require('fs');
var Promise = require('bluebird');

//onFileContent = cb
var readFiles = function(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }

    filenames.forEach(function(filename) {

      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });

  });
};

// store
var data = [];
var loadJSON = function() {
  // var ordered = [];

  readFiles(__dirname + '/data/json/', function(filename, content) {

    content = JSON.parse(content);
    if (content.action.hasOwnProperty('hacking') && content.actor.hasOwnProperty('external')) {
      data.push(content);
      console.log('-------', data.length);
      // console.log('!@!@@@@@', data);
    }

    // console.log('CONTENT', content);
  }, function(err) {
    throw err;
  });
};


module.exports = loadJSON;