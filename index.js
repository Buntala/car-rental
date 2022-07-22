require('dotenv').config()

// IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const http = require('http');

const app = express();
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

let server = http.createServer(app);
server.listen(process.env.PORT,()=>{
    console.log(`The app listening on ${process.env.PORT}`)
})