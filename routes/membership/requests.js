// IMPORTS
const express = require('express');
const { pool } = require("../../utilities/db");
const Joi = require("joi");

// FUNCTIONS
const getData = require('./functions').getMembershipData;
const insertData = require('./functions').insertMembershipData;
const updateData = require('./functions').updateMembershipData;
const deleteData = require('./functions').deleteMembershipData;
const bodyValidate = require('../../utilities/data-validation').bodyValidate;
const paramValidate = require('../../utilities/data-validation').integerParamValidate;

const router = express.Router();

let joi_schema = Joi.object({
    membership_name:Joi.string().required(),
    discount: Joi.number().required()
});


//GET INCENTIVE DATA
router.get('/get',async(req,res)=>{
    let result;
    const client =  await pool.connect();
    result = await getData(client);
    res.status(200).json(result);
    client.release();
    return;
})

//GET INCENTIVE DATA ON ID
router.get('/get/:id',async(req,res)=>{
    //get parameter id
    let id = req.params.id;
    const client =  await pool.connect();
    try{
        paramValidate(id);
        let result = await getData(client,id);
        res.status(200).json(result);
        client.release();
        return;
    }
    catch(err){
        res.status(400).json(err);
        return;
    }
})

//POST INCENTIVE DATA
router.post('/post',async(req,res)=>{
    let data = req.body;
    const client =  await pool.connect();
    try{
        bodyValidate(joi_schema,data);
        _ = await insertData(client,data.membership_name,data.discount);
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

//UPDATE INCENTIVE DATA ON ID
router.put('/update/:id',async(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    const client =  await pool.connect();
    //body data validation
    try{
        bodyValidate(joi_schema,data);
        paramValidate(id);
        await updateData(client,data.membership_name,data.discount,id);
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

//DELETE INCENTIVE DATA ON ID
router.delete('/delete/:id',async(req,res)=>{
    let id = req.params.id;
    let error;
    const client =  await pool.connect();
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