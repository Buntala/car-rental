//IMPORTS
const { pool } = require("../../utilities/db");
const Joi = require("joi");

// FUNCTIONS
const {
    getBookingData,
    insertBookingData,
    updateBookingData,
    deleteBookingData} = require('./functions');
const{
    getBookingJoiValidation,
    postBookingJoiValidation,
    updateBookingJoiValidation,
    deleteBookingJoiValidation
} = require('./rules');
const {
    dataValidate
} = require('../../utilities/data-validation');
const {
    successHandler
} = require('../../utilities/response-handler')

//VALIDATION SCHEMA
//date validate please

async function getBookAll(req,res){
    let result;
    const client =  await pool.connect();
    result = await getBookingData(client);
    successHandler(res, "Booking List Information",result);
    client.release();
}
async function getBookOne(req,res,next){
    //get parameter id
    let data = {...req.params};
    const client =  await pool.connect();
    try{
        dataValidate(getBookingJoiValidation, data);
        let result = await getBookingData(client,data);
        successHandler(res, "Booking Detail Information",result[0]);
    }
    catch(error){
        next(error);
    }
    client.release();  
}
async function postBook(req,res,next){
    let data = req.body;
    const client =  await pool.connect();
    //body data validation
    try{
        dataValidate(postBookingJoiValidation, data);
        result = await insertBookingData(client,data);
        successHandler(res, "Car Data Send Sucessfully",result);
    }
    catch(error){
        next(error)
    }
    client.release();
}
async function patchBook(req,res,next){
    let data = { ...req.params, ...req.body};
    const client =  await pool.connect();
    //Data validation
    try{
        dataValidate(updateBookingJoiValidation,data);
        result = await updateBookingData(client,data);
        successHandler(res, "Booking Data Updated Sucessfully",result);
    }
    catch(error){
        next(error);
    } 
    client.release();    
}
async function deleteBook(req,res,next){
    let data = {...req.params};
    const client =  await pool.connect();
    //Data validation
    try{
        dataValidate(deleteBookingJoiValidation, data);
        result = await deleteBookingData(client,data);
        successHandler(res, "Booking Data Deleted Sucessfully",result);        
    }
    catch(error){
        next(error);
    } 
    client.release(); 
}
module.exports = {
    getBookAll,
    getBookOne,
    postBook,
    patchBook,
    deleteBook
}