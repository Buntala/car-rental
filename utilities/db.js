const fs = require('fs');
const raw_data = fs.readFileSync('./utilities/cred.json');
const credentials = JSON.parse(raw_data);
const { Client } = require('pg')
const client = new Client(credentials)
client.connect()

//USE POOL
exports.client = client;