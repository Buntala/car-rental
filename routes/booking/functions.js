async function getBookingData(id=null,psql){
    let query;
    let result;
    query = 'SELECT *,start_time::varchar,end_time::varchar, total_cost::integer FROM booking ';
    if (id !== null)query += `WHERE booking_id = ${id};`

    result = await psql.query(query);
    //ERROR HANDLING
    return result.rows;
}
async function insertBookingData(psql, customer_id,cars_id,start_time,end_time,total_cost,finished){
    let query;
    let result;

    query = 
    `INSERT INTO booking(customer_id,cars_id,start_time,end_time,total_cost,finished) 
    VALUES ('${customer_id}',${cars_id},'${start_time}','${end_time}',${total_cost},${finished})`;
    result = await psql.query(query);

    //ERROR HANDLING
    return;
}

async function updateBookingData(psql,customer_id,cars_id,start_time,end_time,total_cost,finished,id){
    let query;
    let result; 
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
    console.log
    return ;//result.rows;
}
async function deleteBookingData(psql,id){
    let query;
    let result;
    query = 
    `DELETE FROM booking
    WHERE booking_id = ${id}`;
    result = await psql.query(query);
    //ERROR HANDLING

    return ;//result;
}
exports.getBookingData = getBookingData;
exports.insertBookingData = insertBookingData;
exports.updateBookingData = updateBookingData;
exports.deleteBookingData = deleteBookingData;