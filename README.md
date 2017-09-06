# VERIS Feed Test

### Running the App
Install dependencies: `npm install`
To write *n* newest incidents to `latest-incidents.json`: `node veris.js NUMBER_OF_INCIDENTS`
To load webpage/ run webpack build: `npm run react-dev`


### Deliverables
A repository containing at least the following files:

- veris.js
- latest-incidents.json
- index.html

### Node Script
Create a Node script named `veris.js` that will write the newest *n* incidents from the [VERIS Community Database](https://github.com/vz-risk/VCDB) to a file named `latest-incidents.json` . These incidents should only be `hacking` incidents that contain external actors. The number of incidents will be given as a CLI argument, i.e.:

```bash
$ node veris.js 10
```

### Webpage
Create a simple webpage that presents these incidents in a table-like fashion with some of the most relevant properties, such as:

- Victim Id
- Victim Country
- Actor Country
- Actor Motive
- Actor Variety
- Incident Month/Day/Year
