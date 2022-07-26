//query functions
//const insertIncentiveData = require('../driver_incentive/functions').insertIncentiveData;
const getMembershipData = require('../membership/functions').getMembershipData;
const getDriverData = require('../driver/functions').getDriverData;
const getCarData = require('../car/functions').getCarData;


//get all booking data or get booking by id
async function getBookingData(psql,data=null){
    //select all with date convert to string
    let query = 'SELECT *,start_time::varchar,end_time::varchar FROM booking ';
    //get data with ID
    if (data){
        //add id condition
        query += `WHERE booking_id = ${id};`
        let result = await psql.query(query);
        //check if query is successful
        if (result.rowCount===0){
            let err_msg="ID is invalid!";
            throw err_msg;
        }
        return result.rows[0];
    }
    let result = await psql.query(query);
    return result.rows;
}

async function insertBookingData(psql, data){
    //insert query, then returns the booking id
    const {
        total_cost,discount, driver_incentive,total_driver_cost
    } = await calculateAll(psql,data)
    let query = 
    `INSERT INTO booking(customer_id,cars_id,start_time,end_time,total_cost,finished,discount,booking_type_id,driver_id,total_driver_cost,driver_incentive) 
    VALUES (${data.customer_id},${data.cars_id},'${data.start_time}','${data.end_time}',${total_cost},${data.finished},${discount},${data.booking_type_id},${data.driver_id},${total_driver_cost},${driver_incentive})
    RETURNING *`;
    console.log(query)
    result = await psql.query(query);
    //get booking id of inserted data
    return result.rows[0]
    //INCENTIVE TABLE
    /*
    try{
        //add incentive data to incentive table
        _ = await insertIncentiveData(psql,inserted_booking_id, driver_incentive);
        return;
    }
    catch(error){
        throw error;
    }*/
}



async function updateBookingData(psql,data){
    const {
        total_cost,discount, driver_incentive,total_driver_cost
    } = await calculateAll(psql,data)
    let query =  
    `UPDATE booking 
    SET customer_id = ${data.customer_id},
        cars_id = ${data.cars_id},
        start_time = '${data.start_time}',
        end_time = '${data.end_time}',
        total_cost = ${total_cost},
        discount = ${discount},
        finished = ${data.finished},
        booking_type_id = ${data.booking_type_id},
        driver_id = ${data.driver_id},
        total_driver_cost = ${total_driver_cost},
        driver_incentive = ${driver_incentive}
    WHERE booking_id = ${data.id}
    RETURNING *`;
    console.log(query)
    let result = await psql.query(query);
    console.log("ou")
    //ERROR HANDLING
    if (!result.rowCount){
        let err_msg='Data with the ID not found';
        throw err_msg;
    }
    return result.rows[0];
}
async function deleteBookingData(psql,data){
    let query = 
    `DELETE FROM booking
    WHERE booking_id = ${data.id}
    RETURNING *`;
    result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){
        let err_msg='No data with the ID';
        throw err_msg
    }
    return result.rows[0];
}

async function calculateAll(psql,data){
    let discount;
    let driver_incentive;
    let total_driver_cost;
    let membership_discount = await getMembershipDiscount(psql,data.customer_id);
    let price = await getDailyPrice(psql, data.cars_id);
    let duration = await countDay(data.start_time,data.end_time);
    //count total car rent cost
    let total_cost = await countTotalCost(duration,price);
    //Availability check
    let notAvailable = await availabilityCheck(psql,data.cars_id,data.driver_id);
    if (notAvailable){
        throw notAvailable
    }
    //membership discount
    if (membership_discount){
        discount = await countDiscount(duration,price,membership_discount);
    }
    //when booking includes driver
    //count total driver cost
    if (data.driver_id){
        driver_incentive = await countDriverIncentive(duration,price);
        total_driver_cost = await countDriverCost(psql,data.driver_id,duration);
    }
    return { total_cost,discount, driver_incentive,total_driver_cost }
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
async function countDriverCost(psql,driver_id,duration){
    result = await getDriverData(psql,driver_id);
    return result[0].daily_cost*duration
}

//count the discount
async function countDiscount(duration,daily_price,discount){
    return parseInt(duration * daily_price * discount)
}
//get car rent price
async function getDailyPrice(psql, cars_id){
    let data = {id:cars_id}
    let result = await getCarData(psql,data);
    let price = result.rent_price_daily;
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
async function driverAvailability(psql, driver_id){
    query = 
    `SELECT * FROM booking
     WHERE finished = false AND
     driver_id = ${driver_id}`
    result = await psql.query(query);
    return result.rowCount;
}
async function carAvailability(psql,cars_id){
    query = 
    `SELECT * FROM booking
     WHERE finished = false AND
     cars_id = ${cars_id}`
    result = await psql.query(query);
    return result.rowCount;
}
async function getCarAmount(psql,cars_id){
    let data = {id:cars_id}
    cars = await getCarData(psql, data);
    //console.log(cars);
    return cars.stock;
}
async function availabilityCheck(psql,cars_id,driver_id){
    let carTaken = await carAvailability(psql,cars_id);
    let driverStatus = await driverAvailability(psql,driver_id);
    let carAmount = await getCarAmount(psql,cars_id);
    if (driverStatus){
        return "This driver is currently booked";
    }
    if (carTaken >= carAmount){
        return "This car is fully booked";
    }
    return;
}

exports.getBookingData = getBookingData;
exports.insertBookingData = insertBookingData;
exports.updateBookingData = updateBookingData;
exports.deleteBookingData = deleteBookingData;