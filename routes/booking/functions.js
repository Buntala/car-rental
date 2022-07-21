//query functions
const insertIncentiveData = require('../driver_incentive/functions').insertIncentiveData;
const getMembershipData = require('../membership/functions').getMembershipData;
const getDriverData = require('../driver/functions').getDriverData;

//get all booking data or get booking by id
async function getBookingData(psql,id=null){
    //select all with date convert to string
    let query = 'SELECT *,start_time::varchar,end_time::varchar FROM booking ';
    //get data with ID
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

async function insertBookingData(psql, customer_id,cars_id,start_time,end_time,finished,booking_type_id,driver_id=null){
    let discount;
    let driver_incentive;
    let total_driver_cost;
    let membership_discount = await getMembershipDiscount(psql,customer_id);
    let price = await getDailyPrice(psql, cars_id);
    let duration = await countDay(start_time,end_time);
    //count total car rent cost
    let total_cost = await countTotalCost(duration,price);
    //membership discount
    if (membership_discount){
        discount = await countDiscount(duration,price,membership_discount);
        console.log(discount)
    }
    //when booking includes driver
    //count total driver cost
    if (driver_id){
        driver_incentive = await countDriverIncentive(duration,price);
        let driver_cost = await getDriverCost(psql,driver_id);
        //total driver cost is incentive + total duration cost 
        total_driver_cost = parseInt(driver_incentive) + parseInt(driver_cost);
    }
    //insert query, then returns the booking id
    let query = 
    `INSERT INTO booking(customer_id,cars_id,start_time,end_time,total_cost,finished,discount,booking_type_id,driver_id,total_driver_cost) 
    VALUES ('${customer_id}',${cars_id},'${start_time}','${end_time}',${total_cost},${finished},${discount},${booking_type_id},${driver_id},${total_driver_cost})
    RETURNING booking_id`;
    console.log(query)
    result = await psql.query(query);
    //get booking id of inserted data
    const inserted_booking_id  = result.rows[0].booking_id
    try{
        //add incentive data to incentive table
        _ = await insertIncentiveData(psql,inserted_booking_id, driver_incentive);
        console.log("hello")
        return;
    }
    catch(error){
        throw error;
    }
}

async function updateBookingData(psql,customer_id,cars_id,start_time,end_time,total_cost,finished,booking_type_id,driver_id=null,id){
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
    try{
        result = await getMembershipData(psql,customer_id);
    }
    catch(error){
        return;
    }
    let discount = result[0].discount * 0.01;
    return discount;
}

//get driver cost from driver table
async function getDriverCost(psql,driver_id){
    result = await getDriverData(psql,driver_id);
    return result[0].daily_cost
}

//count the discount
async function countDiscount(duration,daily_price,discount){
    return parseInt(duration * daily_price * discount)
}
//get car rent price
async function getDailyPrice(psql, cars_id){
    let query = 
    `SELECT rent_price_daily FROM cars 
    WHERE cars_id = ${cars_id}`
    let result = await psql.query(query);
    let price = result.rows[0].rent_price_daily;
    return price;
}
//count booking duration in days
async function countDay(start_time,end_time){
    //convert to date datatype
    let start_date = new Date(start_time)
    let end_date = new Date(end_time)
    return Math.ceil(end_date-start_date)/ (1000 * 3600 * 24) + 1 
}

//count driver incentive on a book
async function countDriverIncentive(duration,daily_price){
    return duration * daily_price * 0.05
}
//get car daily price
async function countTotalCost(duration,daily_price){
    return duration * daily_price
}
exports.getBookingData = getBookingData;
exports.insertBookingData = insertBookingData;
exports.updateBookingData = updateBookingData;
exports.deleteBookingData = deleteBookingData;