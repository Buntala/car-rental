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

const bodyValidate = require('../../utilities/data-validation').bodyValidate;
const {successResponse,errorResponse} = require('../../utilities/response-handler');

async function getAllCar(req,res){
    const client =  await pool.connect();
    let result = await getCarData(client);
    //send payload with no input data
    const payload = await successResponse(req,"Data Send Sucessfully",result);
    res.status(200).json(payload);
    client.release();
    return;
}
async function getOneCar(req,res){
    //get parameter id
    let data = {...req.params};
    const client =  await pool.connect();
    try{
        bodyValidate(getCarJoiValidation, data);
        let result = await getCarData(client,data);
        const payload = await successResponse(req,"Data Send Sucessfully",result);
        res.status(200).json(payload);
    }
    catch(error){
        const payload = await errorResponse(req,error);
        res.status(400).json(payload);
    }
    client.release();
    return;
}

async function postCar(req,res){
    let data = req.body;
    const client =  await pool.connect();
    try{
        bodyValidate(postCarJoiValidation, data);
        result = await insertCarData(client,data);
        //get payload with no rows result
        const payload = await successResponse(req,"Data Send Sucessfully",result,data);
        res.status(200).json(payload); 
    }
    catch(error){
        const payload = await errorResponse(req,error,data);
        res.status(400).json(payload);
    }
    client.release();
    return;
}
async function patchCar(req,res){
    let data = { ...req.params, ...req.body};
    const client =  await pool.connect();
    //Data validation
    try{
        bodyValidate(updateCarJoiValidation,data);
        result = await updateCarData(client,data);
        const payload = await successResponse(req,"Data Updated Sucessfully",result,data);
        res.status(200).json(payload);
    }
    catch(error){
        const payload = await errorResponse(req,error,data);
        res.status(400).json(payload);
    } 
    client.release();
    return;
}
async function deleteCar(req,res){
    let data = {...req.params};
    const client =  await pool.connect();
    //Data validation
    try{
        bodyValidate(deleteCarJoiValidation, data);
        result = await deleteCarData(client,data);
        const payload = await successResponse(req,"Data Deleted Sucessfully",result);
        res.status(200).json(payload);
    }
    catch (error){
        const payload = await errorResponse(req,error,data);
        res.status(400).json(payload)
    }
    client.release();
    return;
}
module.exports = {getAllCar,getOneCar,postCar,patchCar,deleteCar}