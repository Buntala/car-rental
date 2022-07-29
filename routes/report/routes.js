const express = require('express');

const router = express.Router();
const {
    getCompanyIncomeAll,
    getDriverReportAll,
    getCarReportAll,
    getCompanyIncomeParams
} = require('./requests');
async function hello(req,res){
    console.log(req.query)
    res.send( req.query)
}
router.get('/company',getCompanyIncomeAll)
router.get('/driver',getDriverReportAll)
router.get('/cars',getCarReportAll)

module.exports = router