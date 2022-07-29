//query functions
const getMembershipData = require('../membership/functions').getMembershipData;
const getDriverData = require('../driver/functions').getDriverData;
const getCarData = require('../car/functions').getCarData;
const getCustData = require('../customer/functions').getCustData;

//get all booking data or get booking by id
async function getBookingData(psql,data=null){
    //select all with date convert to string
    let query = 'SELECT *,start_time::varchar,end_time::varchar FROM booking ';
    //get data with ID
    if (data){
        //add id condition
        query += `WHERE booking_id = ${data.id};`
        let result = await psql.query(query);
        //check if query is successful
        if (result.rowCount===0){
            let err_msg="ID is invalid!";
            throw new Error(err_msg);
        }
        return result.rows[0];
    }   
    let result = await psql.query(query);
    return result.rows;
}

async function insertBookingData(psql, data){
    //Checking car and driver status
    let notAvailable = await availabilityCheck(psql,data.cars_id,data.driver_id);
    if (notAvailable){
        throw new Error(notAvailable);
    }
    //count column data
    const {
        total_cost,discount, driver_incentive,total_driver_cost,
    } = await calculateAll(psql,data)
    let query = 
    `INSERT INTO booking(customer_id,cars_id,start_time,end_time,total_cost,finished,discount,booking_type_id,driver_id,total_driver_cost,driver_incentive) 
    VALUES (${data.customer_id},${data.cars_id},'${data.start_time}','${data.end_time}',${total_cost},false,${discount?discount:0},${data.booking_type_id}, ${data.booking_type_id==2?data.driver_id:null},${data.booking_type_id==2?total_driver_cost:null},${data.booking_type_id==2?driver_incentive:null})
    RETURNING *,start_time::varchar,end_time::varchar`;
    result = await psql.query(query);
    //get booking id of inserted data
    return result.rows[0]
}



async function updateBookingData(psql,data){
    //assign date for new data so calculation can work properly
    current_data = await getBookingData(psql,data)
    data.start_time=current_data.start_time
    data.end_time=current_data.end_time
    let notAvailable = await availabilityCheck(psql,data.cars_id,data.driver_id,current_data.cars_id,current_data.driver_id);
    if (notAvailable){
        throw new Error(notAvailable)
    }
    const {
        discount, total_cost, driver_incentive,total_driver_cost
    } = await calculateAll(psql,data)
    let query =  
    `UPDATE booking 
    SET customer_id = ${data.customer_id},
        cars_id = ${data.cars_id},
        discount = ${discount},
        total_cost = ${total_cost},
        finished = ${data.finished},
        booking_type_id = ${data.booking_type_id},
        driver_id = ${data.booking_type_id==2?data.driver_id:null},
        total_driver_cost = ${data.booking_type_id==2?total_driver_cost:null},
        driver_incentive = ${data.booking_type_id==2?driver_incentive:null}
    WHERE booking_id = ${data.id}
    RETURNING *,start_time::varchar,end_time::varchar`;
    //console.log(query)
    let result = await psql.query(query);
    //ERROR HANDLING
    if (!result.rowCount){
        let err_msg='Data with the ID not found';
        throw new Error(err_msg);
    }
    return result.rows[0];
}
async function deleteBookingData(psql,data){
    let query = 
    `DELETE FROM booking
    WHERE booking_id = ${data.id}
    RETURNING *,start_time::varchar,end_time::varchar`;
    result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){
        let err_msg='No data with the ID';
        throw new Error(err_msg);
    }
    return result.rows[0];
}
//update only for finished
async function finishBooking(psql,data){
    let query =  
    `UPDATE booking 
    SET finished = true
    WHERE booking_id = ${data.id}
    RETURNING *,start_time::varchar,end_time::varchar`;
    let result = await psql.query(query);
    //ERROR HANDLING
    if (!result.rowCount){
        let err_msg='Data with the ID not found';
        throw new Error(err_msg);
    }
    return result.rows[0];
}

//for canceling bookings
async function cancelBooking(psql,data){
    let query =  
    `UPDATE booking 
    SET finished = true,
    canceled = true
    WHERE booking_id = ${data.id}
    RETURNING *,start_time::varchar,end_time::varchar`;
    let result = await psql.query(query);
    //ERROR HANDLING
    if (!result.rowCount){
        let err_msg='Data with the ID not found';
        throw new Error(err_msg);;
    }
    return result.rows[0];
}
async function extendBooking(psql,data){
    //let current_data = await getBookingData(psql,data)
    let current_data = await getBookingData(psql,data)
    if (current_data.end_time>=data.end_time){
        throw new Error(`Please input later date than ${current_data.end_time}`);
    }
    //change to end_time for cost calculation
    current_data.end_time=data.end_time
    const {
        total_cost, discount, driver_incentive,total_driver_cost
    } = await calculateAll(psql,current_data)
    let query =  
    `UPDATE booking 
    SET end_time = '${data.end_time}',
        discount = ${discount?discount:0},
        total_cost = ${total_cost?total_cost:0},
        total_driver_cost = ${current_data.booking_type_id==2?total_driver_cost:null},
        driver_incentive = ${current_data.booking_type_id==2?driver_incentive:null}
    WHERE booking_id = ${data.id}
    RETURNING *,start_time::varchar,end_time::varchar`;
    //console.log(query)
    let result = await psql.query(query);
    //ERROR HANDLING
    if (!result.rowCount){
        let err_msg='Data with the ID not found';
        throw new Error(err_msg);
    }
    return result.rows[0];
}

async function calculateAll(psql,data){
    //customer_id,cars_id,start_time,end_time
    let discount=0;
    let driver_incentive=null;
    let total_driver_cost=null;
    let membership_discount = await getMembershipDiscount(psql,data.customer_id);
    let price = await getDailyPrice(psql, data.cars_id);
    let duration = await countDay(data.start_time,data.end_time);
    //count total car rent cost
    let total_cost = await countTotalCost(duration,price);
    if (membership_discount){
        discount = await countDiscount(duration,price,membership_discount);
    }
    //when booking includes driver
    if (data.booking_type_id==2){
        driver_incentive = await countDriverIncentive(duration,price);
        total_driver_cost = await countDriverCost(psql,data.driver_id,duration);
    }
    return { total_cost,discount, driver_incentive,total_driver_cost }
}
//get membership discount from customer id
async function getMembershipDiscount(psql,id){
    try{
        let data = {id:id}
        cust_data = await getCustData(psql,data);
        if (cust_data.membership_id){
            data = {id:cust_data.membership_id}
            let result = await getMembershipData(psql,cust_data);
            let discount = result.discount * 0.01;
            return discount;
        }
        return 0;
    }
    catch(error){
        return error;
    }
}

//get driver cost from driver table
async function countDriverCost(psql,driver_id,duration){
    data = {id:driver_id}
    result = await getDriverData(psql,data);
    return result.daily_cost*duration
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
    return cars.stock;
}
async function availabilityCheck(psql,cars_id,driver_id,current_car=null,current_driver=null){
    let same_car, same_driver;
    console.log(`cars id:${cars_id}`)
    console.log(`current cars id:${current_car}`)
    console.log(`current cars id:${current_driver}`)
    if (current_car){
        same_car= cars_id==current_car
    }
    if(current_driver){
        if(driver_id){
            same_driver= driver_id == current_driver
        }
    }
    console.log(`same car:${same_car}`)
    let carAmount = await getCarAmount(psql,cars_id);
    let carTaken = await carAvailability(psql,cars_id);
    if (!same_driver && driver_id){
        var driverStatus = await driverAvailability(psql,driver_id);
    }
    if (!same_driver && driverStatus){
        return "This driver is currently booked";
    }
    if (!same_car && carTaken >= carAmount){
        return "This car is fully booked";
    }
    return;
}

module.exports = {
    getBookingData,
    insertBookingData,
    updateBookingData,
    deleteBookingData,
    finishBooking,
    cancelBooking,
    extendBooking
}
exports.getBookingData = getBookingData;
exports.insertBookingData = insertBookingData;
exports.updateBookingData = updateBookingData;
exports.deleteBookingData = deleteBookingData;
