var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var readFiles = (dirname, onFileContent) => {
  return fs.readdirAsync(dirname, 'utf-8').then(filenames => {
    return filenames.map(filename => {
      return fs.readFileAsync(dirname + filename, 'utf-8')
        .then(content => {
          return onFileContent(content);
        });
    });
  });
};

// store

var loadJSON = () => {
  var store = [];
  readFiles(__dirname + '/data/json/', (content) => {

    content = JSON.parse(content);
    // console.log(content);
    if (content.action.hasOwnProperty('hacking') && content.actor.hasOwnProperty('external')) {
      store.push(content);
      // console.log('(((', content);
    }
  }).then(Promise.all)
    .then(() => {
      console.log('STORE', store);
      // sort stuff
    });
};

// store.sort((a, b) => {
//   var yearA = a.timeline.incident.year;
//   var monthA = a.timeline.incident.month ? a.timeline.incident.year : 1;
//   var dayA = a.timeline.incident.day ? a.timeline.incident.day : 1;   
//   var yearB = b.timeline.incident.year;
//   var monthB = b.timeline.incident.month ? b.timeline.incident.year : 1;
//   var dayB = b.timeline.incident.day ? b.timeline.incident.day : 1;  
// });


module.exports = loadJSON;