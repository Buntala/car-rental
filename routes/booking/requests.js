//IMPORTS
const express = require('express');
const { pool } = require("../../utilities/db");
const Joi = require("joi");

// FUNCTIONS
const getData = require('./functions').getBookingData;
const insertData = require('./functions').insertBookingData;
const updateData = require('./functions').updateBookingData;
const deleteData = require('./functions').deleteBookingData;
const bodyValidate = require('../../utilities/data-validation').bodyValidate;
const paramValidate = require('../../utilities/data-validation').integerParamValidate;

const router = express.Router();

//VALIDATION SCHEMA
//date validate please
let joi_schema = Joi.object({
    customer_id:Joi.number().required(),
    cars_id: Joi.number().required(),
    start_time:Joi.date().required(),
    end_time:Joi.date().required(),
    total_cost:Joi.number().required(),
    finished:Joi.boolean().required(),
    booking_type_id:Joi.number().required(),
    driver_id:Joi.number(),
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
    const client =  await pool.connect();
    //params data validation
    try{
        paramValidate(id);
        let result = await getData(id,client);
        res.status(200).json(result);
        client.release();
        return;
    }
    catch(err){
        res.status(400).json(err);
        return;
    }
})

//POST BOOKING DATA
router.post('/post',async(req,res)=>{
    let data = req.body;
    const client =  await pool.connect();
    //body data validation
    //const status = bodyValidate(joi_schema,data)
    try{
        bodyValidate(joi_schema,data);
        _ = await insertData(client,data.customer_id,data.cars_id,data.start_time,data.end_time,data.total_cost,data.finished);
        res.status(200).json(`Data Added Successfully`);
        client.release();
        return;
    }
    catch(error){
        res.status(400).json(error);
        client.release();
        return;
    }

})

//UPDATE BOOKING DATA ON ID
router.put('/update/:id',async(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    const client =  await pool.connect();
    //data validation
    try{
        bodyValidate(joi_schema,data);
        paramValidate(id);
        await updateData(client,data.customer_id,data.cars_id,data.start_time,data.end_time,data.total_cost,data.finished,id); 
        res.status(200).json('Data Updated')
        client.release();
        return;
    }
    catch(error){
        res.status(400).json(error);
        client.release();
        return;
    }
})

router.delete('/delete/:id',async(req,res)=>{
    let id = req.params.id;
    const client =  await pool.connect();
    //Validate data
    try{
        paramValidate(id);
        _ = await deleteData(client,id);
        res.status(200).json('Data Deleted')
        client.release();
    }
    catch (error){
        res.status(400).json(error)
        client.release()
        return;
    }
})
module.exports = router