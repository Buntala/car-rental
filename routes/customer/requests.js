// IMPORTS
const express = require('express');
const { pool } = require("../../utilities/db");
const Joi = require("joi");
// FUNCTIONS
const getData = require('./functions').getCustomerData;
const insertData = require('./functions').insertCustomerData;
const updateData = require('./functions').updateCustomerData;
const deleteData = require('./functions').deleteCustomerData;
const validate = require('../../utilities/data-validation');

const router = express.Router();

let joi_schema = Joi.object({
    name:Joi.string().required(),
    nik: Joi.number().required(),
    phone_number:Joi.number().required()
});

//GET CUSTOMER DATA
router.get('/get',async(req,res)=>{
    let result;
    const client =  await pool.connect();
    result = await getData(null,client);
    res.status(200).json(result);
    client.release();
    return;
})

//GET CUSTOMER DATA ON ID
router.get('/get/:id',async(req,res)=>{
    let id = req.params.id;
    let result;
    const client =  await pool.connect();
    result = await getData(id,client);
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

//POST CUSTOMER DATA
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
    result = await insertData(client,data.name,data.nik,data.phone_number);
    res.status(200).json(`Data Added Successfully`);
    client.release();
    return;
})

//UPDATE CUSTOMER DATA ON ID
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
    error = await updateData(client,data.name,data.nik,data.phone_number,id);
    if (error){
        res.status(400).json(error);
        return;
    }
    res.status(200).json('Data Updated')
    client.release();
    return;
})

//DELETE CUSTOMER DATA ON ID
router.delete('/delete/:id',async(req,res)=>{
    let id = req.params.id;
    let result;
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