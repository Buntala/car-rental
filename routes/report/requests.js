// IMPORTS
const { pool } = require("../../utilities/db");

// FUNCTIONS
const {
    getCompanyIncomeReport,
    getCarBookingReport,
    getDriverBookingReport
} = require('./functions');
const{
    getIncomeReportJoiValidation,
    getDriverReportJoiValidation,
    getCarReportJoiValidation
} = require('./rules');
const { 
    dataValidate
} = require('../../utilities/data-validation');
const {
    successHandler
} = require('../../utilities/response-handler');

async function getCompanyIncomeAll(req,res,next){
    let data = {...req.params,...req.query}
    const client =  await pool.connect();
    try{
        dataValidate(getIncomeReportJoiValidation, data);
        let result = await getCompanyIncomeReport(client,data);
        successHandler(res, "Driver Report Information",result);
    }
    catch(error){
        next(error);
    }
    client.release();     
}

async function getDriverReportAll(req,res,next){
    let data = {...req.params,...req.query}
    const client =  await pool.connect();
    try{
        dataValidate(getDriverReportJoiValidation, data);
        let result = await getDriverBookingReport(client,data);
        successHandler(res, "Driver Report Information",result);
    }
    catch(error){
        next(error);
    }
    client.release();        
}
async function getCarReportAll(req,res,next){
    let data = {...req.params,...req.query}
    const client =  await pool.connect();
    try{
        dataValidate(getCarReportJoiValidation, data);
        let result = await getCarBookingReport(client,data);
        successHandler(res, "Car Report Information",result);
    }
    catch(error){
        next(error);
    }
    client.release();        
}

module.exports = {
    getDriverReportAll,
    getCarReportAll,
    getCompanyIncomeAll
}