// IMPORTS
const express = require('express');
const { pool } = require("../../utilities/db");

// FUNCTIONS
const getData = require('./functions').getCustomerData;
const insertData = require('./functions').insertCustomerData;
const updateData = require('./functions').updateCustomerData;
const deleteData = require('./functions').deleteCustomerData;

const router = express.Router();

router.get('/get',async(req,res)=>{
    let result;
    const client =  await pool.connect();
    result = await getData(null,client);
    res.status(200).json(result);
    client.release();
    return;
})
router.get('/get/:id',async(req,res)=>{
    let id = req.params.id;
    let result;
    const client =  await pool.connect();
    result = await getData(id,client);
    res.status(200).json(result);
    client.release();
    return;
})
router.post('/post',async(req,res)=>{
    let data = req.body;
    let result;
    const client =  await pool.connect();
    result = await insertData(client,data.name,data.nik,data.phone_number);
    res.status(200).json(`Data Added Successfully`);
    client.release();
    return;
})
router.put('/update/:id',async(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    let result;
    const client =  await pool.connect();
    result = await updateData(client,data.name,data.nik,data.phone_number,id);
    res.status(200).json('Data Updated')
    client.release();
    return;
})
router.delete('/delete/:id',async(req,res)=>{
    let id = req.params.id;
    let result;
    const client =  await pool.connect();
    result = await deleteData(client,id)
    res.status(200).json('Data Deleted')
    client.release();
    return;
})
module.exports = router