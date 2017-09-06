var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var { join } = require('path');

var isDirectory = (source) => fs.lstatSync(source).isDirectory();
var getDirectories = (source) =>
  fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory);


var readFiles = (dirname, onFileContent) => {
  return fs.readdirAsync(dirname, 'utf-8').then(filenames => {
    return filenames.map(filename => {
      return fs.readFileAsync(dirname + filename, 'utf-8')
        .then(content => {
          return onFileContent(content);
        }).catch(err => { if (err) { console.log(err); } });
    });
  });
};

var loadJSON = (n) => {

  var incidentDirectories = getDirectories('./data');
  var store = [];

  Promise.all(incidentDirectories.map(dir => {
    return readFiles(__dirname + '/' + dir + '/', (content) => {
      content = JSON.parse(content);
      if (content.action.hasOwnProperty('hacking') && content.actor.hasOwnProperty('external')) {
        store.push(content);
      }
    }).then(Promise.all)
      .catch(err => { console.log('failed to store all related hacking incidents', err); });
  })).then(() => {

    store.sort((a, b) => {
      var yearA = a.timeline.incident.year;
      var monthA = a.timeline.incident.month ? a.timeline.incident.month : 1;
      var dayA = a.timeline.incident.day ? a.timeline.incident.day : 1;   
      var yearB = b.timeline.incident.year;
      var monthB = b.timeline.incident.month ? b.timeline.incident.month : 1;
      var dayB = b.timeline.incident.day ? b.timeline.incident.day : 1;  
      if (yearA < yearB) { return -1; }
      if (yearB < yearA) { return 1; }
      if (monthA < monthB) { return -1; }
      if (monthB < monthA) { return 1; }
      if (dayA < dayB) { return -1; }
      if (dayB < dayA) { return 1; }
      return 0;
    });

    store = store.slice(0, n);

    fs.writeFile('latest-incidents.json', JSON.stringify(store), (err) => {
      if (err) { throw err; }
      console.log('The file has been saved!');
    });
  }).catch(err => { if (err) { console.log('failed to sort incidents and write them to new file', err); } });
};


module.exports = loadJSON;