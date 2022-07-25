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
    postCarJoiValidation,
    getCarJoiValidation,
    deleteCarJoiValidation,
    updateCarJoiValidation
} = require('./rules');
const { 
    bodyValidate
} = require('../../utilities/data-validation');
const {
    successHandler,
} = require('../../utilities/response-handler');

async function getAllCar(req,res){
    const client =  await pool.connect();
    let result = await getCarData(client);
    client.release();
    successHandler(res, "Car List Information",result);
}

async function getOneCar(req,res,next){
    //get parameter id
    let data = {...req.params};
    const client =  await pool.connect();
    try{
        bodyValidate(getCarJoiValidation, data);
        let result = await getCarData(client,data);
        successHandler(res, "Car Detail Information",result[0]);
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
        bodyValidate(postCarJoiValidation, data);
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
        bodyValidate(updateCarJoiValidation,data);
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
        bodyValidate(deleteCarJoiValidation, data);
        result = await deleteCarData(client,data);
        successHandler(res, "Car Data Deleted Sucessfully",result);        
    }
    catch(error){
        next(error);
    } 
    client.release(); 
}

module.exports = {getAllCar,getOneCar,postCar,patchCar,deleteCar}