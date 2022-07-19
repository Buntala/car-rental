// IMPORTS
const express = require('express');
const { pool } = require("../../utilities/db");
const Joi = require("joi");

// FUNCTIONS
const getData = require('./functions').getCarData;
const insertData = require('./functions').insertCarData;
const updateData = require('./functions').updateCarData;
const deleteData = require('./functions').deleteCarData;
const validate = require('../../utilities/data-validation');


const router = express.Router();

//VALIDATION SCHEMA
let joi_schema = Joi.object({
    name:Joi.string().required(),
    rent_price_daily: Joi.number().required(),
    stock:Joi.number().required()
});

//GET CAR DATA
router.get('/get',async(req,res)=>{
    let result;
    const client =  await pool.connect();
    result = await getData(null,client);
    res.status(200).json(result);
    client.release();
    return;
})

//GET CAR DATA ON ID
router.get('/get/:id',async(req,res)=>{
    //get parameter id
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

//POST CAR DATA
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
    //query data
    result = await insertData(client,data.name,data.rent_price_daily,data.stock);
    res.status(200).json(`Data Added Successfully`);
    client.release();
    return;
})

//UPDATE CAR DATA ON ID
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
    error = await updateData(client,data.name,data.rent_price_daily,data.stock,id);
    if (error){
        res.status(400).json(error);
        return;
    }
    res.status(200).json('Data Updated');
    client.release();
    return;
})

//DELETE CAR DATA ON ID
router.delete('/delete/:id',async(req,res)=>{
    let id = req.params.id;
    let error;
    const client =  await pool.connect();
    //body data validation
    error = await deleteData(client,id);
    if (error){
        res.status(400).json('Data ID not found')
        return;
    }
    res.status(200).json('Data Deleted');
    client.release();
    return;
})

module.exports = router