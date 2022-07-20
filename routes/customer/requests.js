// IMPORTS
const express = require('express');
const { pool } = require("../../utilities/db");
const Joi = require("joi");

// FUNCTIONS
const getData = require('./functions').getCustomerData;
const insertData = require('./functions').insertCustomerData;
const updateData = require('./functions').updateCustomerData;
const deleteData = require('./functions').deleteCustomerData;
const bodyValidate = require('../../utilities/data-validation').bodyValidate;
const paramValidate = require('../../utilities/data-validation').integerParamValidate;

const router = express.Router();

let joi_schema = Joi.object({
    name:Joi.string().required(),
    nik: Joi.number().required(),
    phone_number:Joi.number().required(),
    membership_id:Joi.number()
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

//POST CUSTOMER DATA
router.post('/post',async(req,res)=>{
    let data = req.body;
    //let result;
    const client =  await pool.connect();
    console.log(data.phone_number)
    try{
        bodyValidate(joi_schema,data);
        _ = await insertData(client,data.name,data.nik,data.phone_number,data.membership_id);
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

//UPDATE CUSTOMER DATA ON ID
router.put('/update/:id',async(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    const client =  await pool.connect();
    //Data validation
    try{
        bodyValidate(joi_schema,data);
        paramValidate(id);
        await updateData(client,data.name,data.nik,data.phone_number,id); 
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

//DELETE CUSTOMER DATA ON ID
router.delete('/delete/:id',async(req,res)=>{
    let id = req.params.id;
    const client =  await pool.connect();
    //body data validation
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