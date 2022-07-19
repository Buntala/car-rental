const Joi = require("joi");

//Get all car data and get data by car id
async function getCarData(id=null,psql){
    let query;
    let result;

    query = 'SELECT * FROM cars ';
    //Get data with ID
    if (id !== null){
        schema = Joi.number();
        let err_msg;
        //check if id is numeric
        const {error} = schema.validate(id)
        if (error){
            err_msg=error.message
            return [err_msg , []];
        }

        //add id condition
        query += `WHERE cars_id = ${id};`
        result = await psql.query(query);
        
        //check if query is successful
        if (result.rowCount===0)err_msg="ID is invalid!";
        return [err_msg , result.rows];
    }
    //Get all data
    result = await psql.query(query);
    return [null , result.rows];
}


async function insertCarData(psql,name,price,stock){
    let query;
    let result;
    query = 
    `INSERT INTO cars(name,rent_price_daily,stock) 
    VALUES ('${name}',${price},${stock})`;
    result = await psql.query(query);
    return;
}

async function updateCarData(psql,name,price,stock,id){
    let query;
    let result; 
    let err_msg;
    //Validate id
    if (id !== null){
        schema = Joi.number();
        //check if id is numeric
        const {error} = schema.validate(id)
        if (error){
            err_msg=error.message
            return err_msg;
        }
    }

    query =  
    `UPDATE cars 
    SET name = '${name}',
        rent_price_daily = ${price},
        stock = ${stock}
    WHERE cars_id = ${id}`;

    result = await psql.query(query);
    //checks if data with id was updated
    if (!result.rowCount)error='No data with the ID';
    return error;
}

async function deleteCarData(psql,id){
    let query;
    let result;
    let err_msg;
    //Validate id
    if (id !== null){
        schema = Joi.number();
        //check if id is numeric
        const {error} = schema.validate(id)
        if (error){
            err_msg=error.message
            return err_msg;
        }
    }
    query = 
    `DELETE FROM cars
    WHERE cars_id = ${id}`;
    result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){err_msg='No data with the ID'}
    return err_msg;
}

exports.getCarData = getCarData;
exports.insertCarData = insertCarData;
exports.deleteCarData = deleteCarData;
exports.updateCarData = updateCarData;