async function getCompanyIncomeReport(psql,data){
    let duration = await countDuration(psql, data.start_time,data.end_time)
    let driver_day_cost = await countDriverDayCost(psql,duration)
    let query = `
        select 
        coalesce(sum(b.total_driver_cost),0) as "total_driver_cost", 
        coalesce(sum(b.driver_incentive),0) as "total_incentive", 
        coalesce(sum(b.total_cost-b.discount+b.total_driver_cost),0) as "total_gross_income"
        from booking b
        inner join driver d on d.driver_id = b.driver_id
        where b.finished = true ${data.start_time?`and end_time >= '${data.start_time}' and end_time <= '${data.end_time}'`:''}
    `
    let result = await psql.query(query);
    console.log(result.rowCount)
    let result_data = result.rows[0]
    result_data['total_driver_expense'] = parseInt(result_data.total_driver_cost) + parseInt(result_data.total_incentive) 
    result_data['total_nett_income'] = parseInt(result_data.total_gross_income) - parseInt(result_data.total_incentive) - driver_day_cost
    return result_data;
}
async function getDriverBookingReport(psql,data){
    let query = `
    select b.driver_id,coalesce( count(booking_id),0) as "total_booking_count", 
    coalesce(sum(b.end_time - b.start_time+1),0) as "total_days_booking",
    coalesce(sum(b.driver_incentive),0) as "total_incentive"
    from booking b 
    where b.finished = true and b.driver_id ${data.id?'='+data.id:' is not null'}  ${data.start_time?`and b.end_time >= '${data.start_time}' and b.end_time <= '${data.end_time}'`:''}
    group by b.driver_id
    order by b.driver_id;
    `
    let result = await psql.query(query);
    return result.rows;
}

async function getCarBookingReport(psql,data){
    let query = `
    select b.cars_id,count(b.booking_id)  as "total_booking_count", 
    sum(b.end_time - b.start_time+1) as "total_days_booking"
    from booking b
    where b.finished = true and b.cars_id${data.id?'='+data.id:' is not null'}  ${data.start_time?`and end_time >= '${data.start_time}' and end_time <= '${data.end_time}'`:''} ${data.driver_id?'and b.driver_id=' + data.driver_id:''} 
    group by b.cars_id
    order by b.cars_id;`
    console.log(query)
    let result = await psql.query(query);
    return result.rows;
}

async function countDuration(psql,start=null,end=null){
    if(!start&&!end){
            let query =
            `
            select
            min(end_time),max(end_time)
            from booking
            `
            let result = await psql.query(query);
            let min_max = result.rows[0];
            duration = await countDuration(min_max.min,min_max.max)
            let start_datetype = new Date(min_max.min)
            let end_datetype = new Date(min_max.max)
            return Math.ceil(end_datetype-start_datetype)/ (1000 * 3600 * 24) + 1 
    }
    let start_datetype = new Date(start)
    let end_datetype = new Date(end)
    return Math.ceil(end_datetype-start_datetype)/ (1000 * 3600 * 24) + 1 
}

async function countDriverDayCost(psql,duration){
    query = `
    select sum(daily_cost)
    from driver
    `
    result = await psql.query(query)
    let cost_dict = result.rows[0]
    return cost_dict.sum*duration
}

module.exports = {
    getCompanyIncomeReport,
    getCarBookingReport,
    getDriverBookingReport
}