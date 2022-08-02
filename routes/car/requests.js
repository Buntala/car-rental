// IMPORTS
const { pool } = require("../../utilities/db");

// FUNCTIONS
const {
    getCarData,
    insertCarData,
    updateCarData,
    deleteCarData
} = require('./functions');
const{
    getCarJoiValidation,
    postCarJoiValidation,
    updateCarJoiValidation,
    deleteCarJoiValidation
} = require('./rules');
const { 
    dataValidate
} = require('../../utilities/data-validation');
const {
    successHandler
} = require('../../utilities/response-handler');

async function getCarAll(req,res){
    const client =  await pool.connect();
    let result = await getCarData(client);
    client.release();
    successHandler(res, "Car List Information",result);
}

async function getCarOne(req,res,next){
    //get parameter id
    let data = {...req.params};
    const client =  await pool.connect();
    try{
        dataValidate(getCarJoiValidation, data);
        let result = await getCarData(client,data);
        successHandler(res, "Car Detail Information",result);
    }
    catch(error){
        next(error);
    }
    client.release();    
}

async function postCar(req,res,next){
    let data = req.body;
    const client =  await pool.connect();
    try{
        dataValidate(postCarJoiValidation, data);
        result = await insertCarData(client,data);
        //get payload with no rows result        
        successHandler(res, "Car Data Send Sucessfully",result);
    }
    catch(error){
        next(error);
    }
    client.release();    
}

async function patchCar(req,res,next){
    let data = { ...req.params, ...req.body};
    const client =  await pool.connect();
    //Data validation
    try{
        dataValidate(updateCarJoiValidation,data);
        result = await updateCarData(client,data);
        successHandler(res, "Car Data Updated Sucessfully",result);
    }
    catch(error){
        next(error);
    } 
    client.release();    
}

async function deleteCar(req,res,next){
    let data = {...req.params};
    const client =  await pool.connect();
    //Data validation
    try{
        dataValidate(deleteCarJoiValidation, data);
        result = await deleteCarData(client,data);
        successHandler(res, "Car Data Deleted Sucessfully",result);        
    }
    catch(error){
        next(error);
    } 
    client.release(); 
}

module.exports = {
    getCarAll,
    getCarOne,
    postCar,
    patchCar,
    deleteCar
}