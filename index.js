import Airtable from 'airtable'
import express from 'express'
import key from './config.js'

const app = express()
const port = 3000
const base = new Airtable({ apiKey: key }).base('appRTSRlXjQ67gLwM');

app.get('/', (req, res) => {
  let events = waitForRecords();
  console.log(events)
  res.send(events)
})

async function waitForRecords() {
  return await getRecords();
}

async function getRecords() {
  let events = [];
  let filterString = "";
  base('Events').select({
    view: "Grid view",
    filterByFormula: filterString
  }).eachPage((records, fetchNextPage) => {
    // this function is called for each page of records
    events.push.apply(recordsToEventData(records));
    fetchNextPage(); // fetch the next one!
  }, function done(err) {
    if (err) {
      console.log(err);
      return;
    }
  });
  return events;
}

function recordsToEventData(records) {
  let events = [];
  records.forEach(function (record) {
    console.log('Retrieved', record.get('Event Name'));
    events.push({
      name: record.get('Event Name'),
      type: record.get('Event Type'),
      desc: record.get('Description'),
      image: record.get('Image'),
      date: record.get('Date'),
      diversity: record.get('Diversity'),
    });
  });
  return events;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})