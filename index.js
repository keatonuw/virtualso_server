import Airtable from 'airtable'

const express = require('express')
const app = express()
const port = 3000
const keyObj = require('./config.json')
const key = keyObj.key;
const base = new Airtable({ apiKey: key }).base('appRTSRlXjQ67gLwM'); // im so sorry

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})