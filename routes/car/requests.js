// IMPORTS
const express = require('express');
const { pool } = require("../../utilities/db");
const Joi = require("joi");

// FUNCTIONS
const {
    getCarData,
    insertCarData,
    updateCarData,
    deleteCarData
} = require('./functions');

const{
    postCarJoiValidation,
    getCarJoiValidation,
    deleteCarJoiValidation,
    updateCarJoiValidation
} = require('./rules');

const bodyValidate = require('../../utilities/data-validation').bodyValidate;
const paramValidate = require('../../utilities/data-validation').integerParamValidate;

const router = express.Router();

//VALIDATION SCHEMA
let joi_schema = Joi.object({
    name:Joi.string().required(),
    rent_price_daily: Joi.number().required(),
    stock:Joi.number().required()
});

//GET CAR DATA
router.get('/',async(req,res)=>{
    let result;
    const client =  await pool.connect();
    result = await getCarData(client);
    res.status(200).json(result);
    client.release();
    return;
})

//GET CAR DATA ON ID
router.get('/:id',async(req,res)=>{
    //get parameter id
    let data = {...req.params};
    const client =  await pool.connect();
    try{
        bodyValidate(getCarJoiValidation, data)
        let result = await getCarData(client,data);
        res.status(200).json(result);
        client.release();
        return;
    }
    catch(err){
        res.status(400).json(err);
        return;
    }
})

//POST CAR DATA
router.post('/',async(req,res)=>{
    let data = req.body;
    const client =  await pool.connect();
    try{
        bodyValidate(postCarJoiValidation, data);
        _ = await insertCarData(client,data);
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

//UPDATE CAR DATA ON ID
router.patch('/:id',async(req,res)=>{    
    let data = { ...req.params, ...req.body};
    const client =  await pool.connect();
    //body data validation
    try{
        bodyValidate(updateCarJoiValidation,data);
        await updateCarData(client,data)
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

//DELETE CAR DATA ON ID
router.delete('/:id',async(req,res)=>{
    let data = {...req.params};
    let error;
    const client =  await pool.connect();
    try{
        bodyValidate(deleteCarJoiValidation, data)
        _ = await deleteCarData(client,data);
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