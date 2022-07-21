const express = require('express');
const bodyParser = require('body-parser');

let portNum=8080;

var http = require('http');

//routes
const cars = require('./routes/car/requests')
const customer = require('./routes/customer/requests')
const booking = require('./routes/booking/requests')
const driver = require('./routes/driver/requests')
const incentive = require('./routes/driver_incentive/requests')
const membership = require('./routes/membership/requests')

const app = express();
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/cars',cars)
app.use('/customer',customer)
app.use('/booking',booking)
app.use('/driver',driver)
app.use('/incentive',incentive)
app.use('/membership',membership)
app.set('port',portNum)

let server = http.createServer(app);
server.listen(portNum,()=>{
    console.log(`The app listening on ${portNum}`)
})