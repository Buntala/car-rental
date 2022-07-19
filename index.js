const express = require('express');
const bodyParser = require('body-parser');

let portNum=8080;

var http = require('http');

//routes
const cars = require('./routes/car/requests')
const customer = require('./routes/customer/requests')
const booking = require('./routes/booking/requests')

const app = express();
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/cars',cars)
app.use('/customer',customer)
app.use('/booking',booking)
app.set('port',portNum)

let server = http.createServer(app);
server.listen(portNum,()=>{
    console.log(`The app listening on ${portNum}`)
})