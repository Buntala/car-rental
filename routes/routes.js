// IMPORTS
const express = require('express');

//routes
const cars = require('./car/routes')
const customer = require('./customer/requests')
const booking = require('./booking/requests')
const driver = require('./driver/requests')
const incentive = require('./driver_incentive/requests')
const membership = require('./membership/requests')

const router = express.Router();
          
router.use('/cars',cars)
router.use('/customer',customer)
router.use('/booking',booking)
router.use('/driver',driver)
router.use('/incentive',incentive)
router.use('/membership',membership)

module.exports = router