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

      var sliced = store.slice(0, 10);
      var dates = function(arr) {

        return arr.map(a => {
          var yearA = a.timeline.incident.year;
          var monthA = a.timeline.incident.month ? a.timeline.incident.month : 1;
          var dayA = a.timeline.incident.day ? a.timeline.incident.day : 1; 
          return `${monthA}/${dayA}/${yearA}`;  
        });
      };
      console.log('$$$$$$', dates(sliced));

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
      
      console.log(store.length);
      console.log('!!!STORE', dates(store.slice(0, 10)));
      store = store.slice(0, 3);

      fs.writeFile('latest-incidents.json', JSON.stringify(store), (err) => {
        if (err) { throw err; }
        console.log('The file has been saved!');
      });
    });
};




module.exports = loadJSON;