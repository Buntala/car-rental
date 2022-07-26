// IMPORTS
const express = require('express');

//routes
const cars = require('./car/routes')
const customer = require('./customer/routes')
const booking = require('./booking/routes')
const driver = require('./driver/requests')
const incentive = require('./driver_incentive/routes')
const membership = require('./membership/requests')
const report  = require('./report/requests')

const router = express.Router();
          
router.use('/cars',cars)
router.use('/customer',customer)
router.use('/booking',booking)
router.use('/driver',driver)
router.use('/incentive',incentive)
router.use('/membership',membership)
router.use('/report',report)

module.exports = router