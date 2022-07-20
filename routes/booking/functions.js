//Get all booking data or get booking by id
async function getBookingData(id,psql){
    //select all with date convert to string
    let query = 'SELECT *,start_time::varchar,end_time::varchar FROM booking ';
    //Get data with ID
    if (id !== null){
        //add id condition
        query += `WHERE booking_id = ${id};`
        let result = await psql.query(query);
        //check if query is successful
        if (result.rowCount===0){
            let err_msg="ID is invalid!";
            throw err_msg;
        }
        return result.rows;
    }
    let result = await psql.query(query);
    return result.rows;
}

async function insertBookingData(psql, customer_id,cars_id,start_time,end_time,total_cost,finished,booking_type_id){
    let query = 
    `INSERT INTO booking(customer_id,cars_id,start_time,end_time,total_cost,finished,membership_id) 
    VALUES ('${customer_id}',${cars_id},'${start_time}','${end_time}',${total_cost},${finished},${booking_type_id})`;
    
    _ = await psql.query(query);
    return;
}

async function updateBookingData(psql,customer_id,cars_id,start_time,end_time,total_cost,finished,id){
    let query =  
    `UPDATE booking 
    SET customer_id = ${customer_id},
        cars_id = ${cars_id},
        start_time = '${start_time}',
        end_time = '${end_time}',
        total_cost = ${total_cost},
        finished = ${finished}
    WHERE booking_id = ${id}`;

    let result = await psql.query(query);
    //ERROR HANDLING
    if (!result.rowCount){
        let err_msg='Data with the ID not found';
        throw err_msg;
    }
    return;
}
async function deleteBookingData(psql,id){
    let query = 
    `DELETE FROM booking
    WHERE booking_id = ${id}`;
    result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){
        let err_msg='No data with the ID';
        throw err_msg
    }
    return;
}

//get membership discount from customer id
async function getMembershipDiscount(psql,customer_id){
    let query = 
    `SELECT m.discount FROM customer c
    INNER JOIN membership m on c.membership_id=m.membership_id
    WHERE c.customer_id = ${customer_id}`
    let result = await psql.query(query);
    let discount = result.rows[0].discount * 0.01;
    return discount;
}

//count the discount
async function countDiscount(start_time,end_time,discount){
    //convert to date datatype
    start_date = new Date(start_time)
    end_date = new Date(end_time)
    return Math.ceil(end_date-start_date)/ (1000 * 3600 * 24)
}

exports.getBookingData = getBookingData;
exports.insertBookingData = insertBookingData;
exports.updateBookingData = updateBookingData;
exports.deleteBookingData = deleteBookingData;