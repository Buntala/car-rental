// IMPORTS
const { pool } = require("../../utilities/db");

// FUNCTIONS
const {
    getDriverData,
    insertDriverData,
    updateDriverData,
    deleteDriverData
} = require('./functions');
const{
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

/*

//GET DRIVER DATA
router.get('/get',async(req,res)=>{
    let result;
    const client =  await pool.connect();
    result = await getData(client);
    res.status(200).json(result);
    client.release();
    return;
})

//GET DRIVER DATA ON ID
router.get('/get/:id',async(req,res)=>{
    //get parameter id
    let id = req.params.id;
    const client =  await pool.connect();
    try{
        paramValidate(id);
        let result = await getData(client,id);
        res.status(200).json(result);
        client.release();
        return;
    }
    catch(err){
        res.status(400).json(err);
        return;
    }
})

//POST DRIVER DATA
router.post('/post',async(req,res)=>{
    let data = req.body;
    const client =  await pool.connect();
    try{
        bodyValidate(joi_schema,data);
        _ = await insertData(client,data.name,data.nik,data.phone_number,data.daily_cost);
        res.status(200).json(`Data Added Successfully`);
        client.release();
        return;
    }
    catch(error){
        res.status(400).json(error);
        client.release();
        return;
    }
})

//UPDATE DRIVER DATA ON ID
router.put('/update/:id',async(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    const client =  await pool.connect();
    //body data validation
    try{
        bodyValidate(joi_schema,data);
        paramValidate(id);
        await updateData(client,data.name,data.nik,data.phone_number,data.daily_cost,id);
        res.status(200).json('Data Updated')
        client.release();
        return;
    }
    catch(error){
        res.status(400).json(error);
        client.release();
        return;
    }
})

//DELETE DRIVER DATA ON ID
router.delete('/delete/:id',async(req,res)=>{
    let id = req.params.id;
    let error;
    const client =  await pool.connect();
    try{
        paramValidate(id);
        _ = await deleteData(client,id);
        res.status(200).json('Data Deleted')
        client.release();
    }
    catch (error){
        res.status(400).json(error)
        client.release()
        return;
    }
})*/
module.exports = {
    getDriverAll,
    getDriverOne,
    postDriver,
    patchDriver,
    deleteDriver
}