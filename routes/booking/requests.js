//IMPORTS
const express = require('express');
const { pool } = require("../../utilities/db");
const Joi = require("joi");

// FUNCTIONS
const getData = require('./functions').getBookingData;
const insertData = require('./functions').insertBookingData;
const updateData = require('./functions').updateBookingData;
const deleteData = require('./functions').deleteBookingData;
const validate = require('../../utilities/data-validation');

const router = express.Router();

//VALIDATION SCHEMA
//date validate please
let joi_schema = Joi.object({
    customer_id:Joi.number().required(),
    cars_id: Joi.number().required(),
    start_time:Joi.string().required(),
    end_time:Joi.string().required(),
    total_cost:Joi.number().required(),
    finished:Joi.boolean().required()
});

//GET BOOKING DATA
router.get('/get',async(req,res)=>{
    let result;
    const client =  await pool.connect();
    result = await getData(null,client);
    res.status(200).json(result);
    client.release();
    return;
})

//GET BOOKING DATA ON ID
router.get('/get/:id',async(req,res)=>{
    let id = req.params.id;
    let result;
    const client =  await pool.connect();
    //params data validation
    [error, result] = await getData(id,client);
    if (error){
            res.status(400).json(error);
        return;
    }
    res.status(200).json(result);
    client.release();
    return;
})

//POST BOOKING DATA
router.post('/post',async(req,res)=>{
    let data = req.body;
    let result;
    const client =  await pool.connect();
    //body data validation
    const status = validate(joi_schema,data)
    if (status){
        res.status(400).json(status);
        return;
    }
    result = await insertData(client,data.customer_id,data.cars_id,data.start_time,data.end_time,data.total_cost,data.finished);
    res.status(200).json(`Data Added Successfully`);
    client.release();
    return;
})

//UPDATE BOOKING DATA ON ID
router.put('/update/:id',async(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    let error;
    const client =  await pool.connect();
    //body data validation
    const status = validate(joi_schema,data);
    if (status){
        res.status(400).json(status);
        return;
    }
    //params data validation
    error = await updateData(client,data.customer_id,data.cars_id,data.start_time,data.end_time,data.total_cost,data.finished,id); 
    if (error){
        res.status(400).json(error);
        return;
    }
    res.status(200).json('Data Updated')
    client.release();
    return;
})
router.delete('/delete/:id',async(req,res)=>{
    let id = req.params.id;
    let result;
    const client =  await pool.connect();
    error = await deleteData(client,id);
    if (error){
        res.status(400).json('Data ID not found')
        return;
    }
    res.status(200).json('Data Deleted')
    client.release();
    return;
})
module.exports = router