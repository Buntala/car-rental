const fs = require('fs');
const raw_data = fs.readFileSync('./utilities/cred.json');
const credentials = JSON.parse(raw_data);
const { Pool } = require('pg')
const pool = new Pool(credentials)
//pool.connect()


exports.pool = pool;