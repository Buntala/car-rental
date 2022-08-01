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
router.use('/customers',customer)
router.use('/bookings',booking)
router.use('/drivers',driver)
router.use('/incentives',incentive)
router.use('/memberships',membership)
router.use('/reports',report)

module.exports = router