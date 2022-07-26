// IMPORTS
const { pool } = require("../../utilities/db");

// FUNCTIONS
const {
    getMembershipData,
    insertMembershipData,
    updateMembershipData,
    deleteMembershipData} = require('./functions');
const {
    getMembershipJoiValidation,
    postMembershipJoiValidation,
    updateMembershipJoiValidation,
    deleteMembershipJoiValidation
} = require('./rules');
const{
    dataValidate
} = require('../../utilities/data-validation');
const {
    successHandler
} = require('../../utilities/response-handler');


async function getMemberAll(req,res){
    const client =  await pool.connect();
    let result = await getMembershipData(client);
    client.release();
    successHandler(res, "Membership List Information",result);
}

async function getMemberOne(req,res,next){
    //get parameter id
    let data = {...req.params};
    const client =  await pool.connect();
    try{
        dataValidate(getMembershipJoiValidation, data);
        let result = await getMembershipData(client,data);
        successHandler(res, "Membership Detail Information",result);
    }
    catch(error){
        next(error);
    }
    client.release();    
}

async function postMember(req,res,next){
    let data = req.body;
    const client =  await pool.connect();
    try{
        dataValidate(postMembershipJoiValidation, data);
        result = await insertMembershipData(client,data);
        //get payload with no rows result        
        successHandler(res, "Membership Data Send Sucessfully",result);
    }
    catch(error){
        next(error);
    }
    client.release(); 
}
async function patchMember(req,res,next){
    let data = { ...req.params, ...req.body};
    const client =  await pool.connect();
    //Data validation
    try{
        dataValidate(updateMembershipJoiValidation,data);
        result = await updateMembershipData(client,data);
        successHandler(res, "Membership Data Updated Sucessfully",result);
    }
    catch(error){
        next(error);
    } 
    client.release();    
}

async function deleteMember(req,res,next){
    let data = {...req.params};
    const client =  await pool.connect();
    //Data validation
    try{
        dataValidate(deleteMembershipJoiValidation, data);
        result = await deleteMembershipData(client,data);
        successHandler(res, "Car Data Deleted Sucessfully",result);        
    }
    catch(error){
        next(error);
    } 
    client.release(); 
}

module.exports = {
    getMemberAll,
    getMemberOne,
    postMember,
    patchMember,
    deleteMember
}