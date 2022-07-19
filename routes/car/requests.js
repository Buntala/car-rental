// IMPORTS
const express = require('express');
const { client } = require("../../utilities/db");

// FUNCTIONS
const getData = require('./functions').getCarData;
const insertData = require('./functions').insertCarData;
const updateData = require('./functions').updateCarData;
const deleteData = require('./functions').deleteCarData;

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
    result = await insertData(client,data.name,data.rent_price_daily,data.stock);
    res.status(200).json(`Data Added Successfully`);
})
router.put('/update/:id',async(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    let result;
    result = await updateData(client,data.name,data.rent_price_daily,data.stock,id);
    res.status(200).json('Data Updated')
})
router.delete('/delete/:id',async(req,res)=>{
    let id = req.params.id;
    let result;
    result = await deleteData(client,id)
    res.status(200).json('Data Deleted')
})
module.exports = router