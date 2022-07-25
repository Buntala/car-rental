//IMPORTS
const express = require('express');
const { pool } = require("../../utilities/db");

// FUNCTIONS
const getMonthlyCarBooking = require('./functions').getMonthlyCarBooking;
const getMonthlyTimeBooking = require('./functions').getMonthlyTimeBooking;
const getDriverBookCount = require('./functions').getDriverBookCount;
const getTotalIncentive = require('./functions').getTotalIncentive;
const getDriverTimeBooking = require('./functions').getDriverTimeBooking;
const router = express.Router();

//REPORT DATA
router.get('/book/car',async(req,res)=>{
    let result;
    const client =  await pool.connect();
    result = await getMonthlyCarBooking(client,2021);
    res.status(200).json(result);
    client.release();
    return;
})
router.get('/book/day',async(req,res)=>{
    let result;
    const client =  await pool.connect();
    result = await getMonthlyTimeBooking(client,2021);
    res.status(200).json(result);
    client.release();
    return;
})
router.get('/driver/incentive',async(req,res)=>{
    let result;
    const client =  await pool.connect();
    result = await getTotalIncentive(client,2021);
    res.status(200).json(result);
    client.release();
    return;
})
router.get('/driver/day',async(req,res)=>{
    let result;
    const client =  await pool.connect();
    result = await getDriverTimeBooking(client,2021);
    res.status(200).json(result);
    client.release();
    return;
})
router.get('/book/driver',async(req,res)=>{
    let result;
    const client =  await pool.connect();
    result = await getDriverBookCount(client,2021);
    res.status(200).json(result);
    client.release();
    return;
})
router.get('/try',async(req,res)=>{
    let result;
    const client =  await pool.connect();
    result = await getMonthlyCarBooking(client,2021);
    res.status(200).json(result);
    client.release();
    return;
})
module.exports = router