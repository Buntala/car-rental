// IMPORTS
const { pool } = require("../../utilities/db");

// FUNCTIONS
const {
    getDriverData,
    insertDriverData,
    updateDriverData,
    deleteDriverData
} = require('./functions');
const {
    getDriverJoiValidation,
    postDriverJoiValidation,
    updateDriverJoiValidation,
    deleteDriverJoiValidation
} = require('./rules');
const { 
    dataValidate
} = require('../../utilities/data-validation');
const {
    successHandler
} = require('../../utilities/response-handler');

async function getDriverAll(req,res){
    const client =  await pool.connect();
    let result = await getDriverData(client);
    client.release();
    successHandler(res, "Driver List Information",result);
}
async function getDriverOne(req,res,next){
    //get parameter id
    let data = {...req.params};
    const client =  await pool.connect();
    try{
        dataValidate(getDriverJoiValidation, data);
        let result = await getDriverData(client,data);
        successHandler(res, "Driver Detail Information",result);
    }
    catch(error){
        next(error);
    }
    client.release();    
}

async function postDriver(req,res,next){
    let data = req.body;
    const client =  await pool.connect();
    try{
        dataValidate(postDriverJoiValidation, data);
        result = await insertDriverData(client,data);
        //get payload with no rows result        
        successHandler(res, "Driver Data Send Sucessfully",result);
    }
    catch(error){
        next(error);
    }
    client.release();    
}

async function patchDriver(req,res,next){
    let data = { ...req.params, ...req.body};
    const client =  await pool.connect();
    //Data validation
    try{
        dataValidate(updateDriverJoiValidation,data);
        result = await updateDriverData(client,data);
        successHandler(res, "Car Data Updated Sucessfully",result);
    }
    catch(error){
        next(error);
    } 
    client.release();    
}

async function deleteDriver(req,res,next){
    let data = {...req.params};
    const client =  await pool.connect();
    //Data validation
    try{
        dataValidate(deleteDriverJoiValidation, data);
        result = await deleteDriverData(client,data);
        successHandler(res, "Car Data Deleted Sucessfully",result);        
    }
    catch(error){
        next(error);
    } 
    client.release(); 
}

module.exports = {
    getDriverAll,
    getDriverOne,
    postDriver,
    patchDriver,
    deleteDriver
}