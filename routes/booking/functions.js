const Joi = require("joi");

async function getBookingData(id=null,psql){
    let query;
    let result;

    //select all with date convert to string
    query = 'SELECT *,start_time::varchar,end_time::varchar FROM booking ';
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
        if (id !== null)query += `WHERE booking_id = ${id};`
        result = await psql.query(query);
        
        //check if query is successful
        
        if (result.rowCount===0)err_msg="ID is invalid!";
        return [err_msg , result.rows];
    }
    result = await psql.query(query);
    return result.rows;
}
async function insertBookingData(psql, customer_id,cars_id,start_time,end_time,total_cost,finished){
    let query;
    let result;
    query = 
    `INSERT INTO booking(customer_id,cars_id,start_time,end_time,total_cost,finished) 
    VALUES ('${customer_id}',${cars_id},'${start_time}','${end_time}',${total_cost},${finished})`;
    result = await psql.query(query);
    return;
}

async function updateBookingData(psql,customer_id,cars_id,start_time,end_time,total_cost,finished,id){
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
    `UPDATE booking 
    SET customer_id = ${customer_id},
        cars_id = ${cars_id},
        start_time = '${start_time}',
        end_time = '${end_time}',
        total_cost = ${total_cost},
        finished = ${finished}
    WHERE booking_id = ${id}`;

    result = await psql.query(query);
    //ERROR HANDLING
    if (!result.rowCount)error='Data with the ID not found';
    return error;//result.rows;
}
async function deleteBookingData(psql,id){
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
    `DELETE FROM booking
    WHERE booking_id = ${id}`;
    result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount)err_msg='No data with the ID';
    return err_msg;
}
exports.getBookingData = getBookingData;
exports.insertBookingData = insertBookingData;
exports.updateBookingData = updateBookingData;
exports.deleteBookingData = deleteBookingData;