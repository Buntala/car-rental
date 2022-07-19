// IMPORTS
const express = require('express');
const { client } = require("../../utilities/db");

// FUNCTIONS
const getData = require('./functions').getCustomerData;
const insertData = require('./functions').insertCustomerData;
const updateData = require('./functions').updateCustomerData;
const deleteData = require('./functions').deleteCustomerData;

const router = express.Router();

router.get('/get',async(req,res)=>{
    let result;
    result = await getData(null,client);
    res.status(200).json(result);
    return;
})
router.get('/get/:id',async(req,res)=>{
    let id = req.params.id;
    let result;
    result = await getData(id,client);
    res.status(200).json(result);
    return;
})
router.post('/post',async(req,res)=>{
    let data = req.body;
    let result;
    result = await insertData(client,data.name,data.nik,data.phone_number);
    res.status(200).json(`Data Added Successfully`);
})
router.put('/update/:id',async(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    let result;
    result = await updateData(client,data.name,data.nik,data.phone_number,id);
    res.status(200).json('Data Updated')
})
router.delete('/delete/:id',async(req,res)=>{
    let id = req.params.id;
    let result;
    result = await deleteData(client,id)
    res.status(200).json('Data Deleted')
})
module.exports = router