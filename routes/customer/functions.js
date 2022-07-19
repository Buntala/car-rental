const Joi = require("joi");

async function getCustomerData(id=null,psql){
    let query;
    let result;
    query = 'SELECT * FROM customer ';
    //Get data with id
    if (id !== null){
        schema = Joi.number();
        let err_msg;
        //check if id is numeric
        const {error} = schema.validate(id)
        if (error){
            err_msg=error.message
            return [err_msg , []];
        }

        query += `WHERE customer_id = ${id};`
        result = await psql.query(query);

        //check if query is successful
        if (result.rowCount===0)err_msg="ID is invalid!";
        return [err_msg , result.rows];
    }

    result = await psql.query(query);
    //ERROR HANDLING
    return result.rows;
}

async function insertCustomerData(psql,name,nik,phone_number){
    let query;
    let result;
    
    query = 
    `INSERT INTO customer(name,nik,phone_number)
    VALUES ('${name}',${nik},${phone_number})`;
    result = await psql.query(query);
    return;
}
async function updateCustomerData(psql,name,nik,phone_number,id){
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
    `UPDATE customer 
    SET name = '${name}',
        nik = '${nik}',
        phone_number = '${phone_number}'
    WHERE customer_id = ${id}`;

    result = await psql.query(query);
    console.log(result.rowCount)
    //checks if data with id was updated
    if (!result.rowCount)error='No data with the ID';
    return error;
}
async function deleteCustomerData(psql,id){
    let query;
    let result;
    let error;

    query = 
    `DELETE FROM customer
    WHERE customer_id = ${id}`;
    result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){error='No data with the ID'}
    return error ;//result;
}

exports.getCustomerData = getCustomerData;
exports.insertCustomerData = insertCustomerData;
exports.updateCustomerData = updateCustomerData;
exports.deleteCustomerData = deleteCustomerData;
