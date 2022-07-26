// IMPORTS
const { pool } = require("../../utilities/db");

// FUNCTIONS
const {
    getCustData,
    insertCustData,
    updateCustData,
    deleteCustData
} = require('./functions')

const{
    postCustJoiValidation,
    getCustJoiValidation,
    deleteCustJoiValidation,
    updateCustJoiValidation
} = require('./rules');


const {
    dataValidate
} = require('../../utilities/data-validation');
const {
    successHandler
} = require('../../utilities/response-handler');


async function getCustAll(req,res){
    const client =  await pool.connect();
    let result = await getCustData(client);
    client.release();
    successHandler(res, "Customer List Information",result);
}

async function getCustOne(req,res,next){
    let data = {...req.params};
    const client =  await pool.connect();
    //params data validation
    try{
        dataValidate(getCustJoiValidation, data);
        let result = await getCustData(client,data);
        successHandler(res, "Customer Detail Information",result[0]);
    }
    catch(error){
        next(error);
    }
    client.release();
}

async function postCust(req,res,next){
    let data = req.body;
    const client =  await pool.connect();
    try{
        dataValidate(postCustJoiValidation, data);
        result = await insertCustData(client,data);
        successHandler(res, "Customer Data Send Sucessfully",result);
    }
    catch(error){
        next(error);
    }
    client.release();
}
async function patchCust(req,res,next){
    let data = { ...req.params, ...req.body};
    const client =  await pool.connect();
    //Data validation
    try{
        dataValidate(updateCustJoiValidation,data);
        result = await updateCustData(client,data);
        successHandler(res, "Customer Data Updated Sucessfully",result);
    }
    catch(error){
        next(error);
    } 
    client.release();
    return;
}
async function deleteCust(req,res,next){
    let data = {...req.params};
    const client =  await pool.connect();
    //Data validation
    try{
        dataValidate(deleteCustJoiValidation, data);
        result = await deleteCustData(client,data);
        successHandler(res, "Customer Data Deleted Sucessfully",result); 
    }
    catch (error){
        next(error);
    }
    client.release();
    return;
}
module.exports = {
    getCustAll,
    getCustOne,
    postCust,
    patchCust,
    deleteCust
}