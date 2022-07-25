async function getDriverCost(psql,year){
    let query = `
    select EXTRACT(MONTH from b.end_time) AS "Month",  d.name, count(booking_id) as "total_booking_count" 
    from booking b 
    inner join driver d on d.driver_id = b.driver_id
    where b.finished = true and EXTRACT(Year from b.end_time) = ${year}
    group by "Month", d.name
    order by "Month", d.name;
    `
    let result = await psql.query(query);
    return result.rows;
}








async function getMonthlyCarBooking(psql,year){
    let query = `
    select EXTRACT(MONTH from b.end_time) AS "Month", c.name,count(b.booking_id)
    from cars c
    inner join booking b on b.cars_id = c.cars_id
    where b.finished = true and EXTRACT(Year from b.end_time) = ${year}
    group by "Month", c.name
    order by "Month", c.name;`
    let result = await psql.query(query);
    return result.rows;
}

async function getMonthlyTimeBooking(psql,year){
    let query = `
    select EXTRACT(MONTH from b.end_time) AS "Month", c.name, sum(b.end_time - b.start_time+1) as "duration"
    from booking b 
    inner join cars c on b.cars_id = c.cars_id
    where b.finished = true and EXTRACT(Year from b.end_time) = ${year}
    group by "Month", c.name
    order by "Month", c.name;`
    let result = await psql.query(query);
    return result.rows;
}

async function getDriverBookCount(psql,year){
    let query = `
    select EXTRACT(MONTH from b.end_time) AS "Month",  d.name, count(booking_id) as "total_booking_count" 
    from booking b 
    inner join driver d  on d.driver_id = b.driver_id
    where b.finished = true and EXTRACT(Year from b.end_time) = ${year}
    group by "Month", d.name
    order by "Month", d.name;
    `
    let result = await psql.query(query);
    return result.rows;
}

async function getDriverTimeBooking(psql,year){
    let query = `
    select EXTRACT(MONTH from b.end_time) AS "Month",  d.name, sum(b.end_time - b.start_time+1) as "duration"
    from booking b 
    inner join driver d  on d.driver_id = b.driver_id
    where b.finished = true and EXTRACT(Year from b.end_time) = ${year}
    group by "Month", d.name
    order by "Month", d.name;
    `
    let result = await psql.query(query);
    return result.rows;
}

async function getTotalIncentive(psql,year){
    let query = `
    select EXTRACT(MONTH from b.end_time) AS "Month", d.name, sum(i.incentive) as "total_incentive" from driver_incentive i 
    inner join booking b on b.booking_id = i.booking_id
    inner join driver d  on d.driver_id = b.driver_id
    where b.finished = true and EXTRACT(Year from b.end_time) = ${year}
    group by  "Month", d.name
    order by "Month", d.name;
    `
    let result = await psql.query(query);
    return result.rows;
}

//find this year
async function yearNow(){
    let this_year = new Date()
    return this_year.getFullYear()
}


exports.getMonthlyCarBooking = getMonthlyCarBooking;
exports.getMonthlyTimeBooking = getMonthlyTimeBooking;
exports.getDriverBookCount = getDriverBookCount;
exports.getTotalIncentive = getTotalIncentive;
exports.getDriverTimeBooking = getDriverTimeBooking;