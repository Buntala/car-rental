// IMPORTS
const express = require('express');
const { pool } = require("../../utilities/db");

// FUNCTIONS
const {
    getIncentiveData,
    insertIncentiveData,
    updateIncentiveData,
    deleteIncentiveData
} = require('./functions')
const{
    getIncentiveJoiValidation,
    postIncentiveJoiValidation,
    updateIncentiveJoiValidation,
    deleteIncentiveJoiValidation
} = require('./rules');
const {
    dataValidate
} = require('../../utilities/data-validation');
const {
    successHandler
} = require('../../utilities/response-handler');

async function getIncentiveAll(req,res){
    const client =  await pool.connect();
    let result = await getIncentiveData(client);
    client.release();
    successHandler(res, "Driver Incentive List Information",result);
}

async function getIncentiveOne(req,res,next){
    //get parameter id
    let data = {...req.params};
    const client =  await pool.connect();
    try{
        dataValidate(getIncentiveJoiValidation, data);
        let result = await getIncentiveData(client,data);
        successHandler(res, "Driver Incentive Detail Information",result[0]);
    }
    catch(error){
        next(error);
    }
    client.release();
}
async function postIncentive(req,res,next){
    let data = req.body;
    const client =  await pool.connect();
    try{
        dataValidate(postIncentiveJoiValidation, data);
        result = await insertIncentiveData(client,data);
        //get payload with no rows result        
        successHandler(res, "Driver Incentive Data Send Sucessfully",result);
    }
    catch(error){
        next(error);
    }
    client.release();   
}
async function patchIncentive(req,res,next){
    let data = { ...req.params, ...req.body};
    const client =  await pool.connect();
    //Data validation
    try{
        dataValidate(updateIncentiveJoiValidation,data);
        result = await updateIncentiveData(client,data);
        successHandler(res, "Driver Incentive Data Updated Sucessfully",result);
    }
    catch(error){
        next(error);
    } 
    client.release();    
}
async function deleteIncentive(req,res,next){
    let data = {...req.params};
    const client =  await pool.connect();
    //Data validation
    try{
        dataValidate(deleteIncentiveJoiValidation, data);
        result = await deleteIncentiveData(client,data);
        successHandler(res, "Driver Incentive Data Deleted Sucessfully",result);        
    }
    catch(error){
        next(error);
    } 
    client.release(); 
}
module.exports = {
    getIncentiveAll,
    getIncentiveOne,
    postIncentive,
    patchIncentive,
    deleteIncentive
}