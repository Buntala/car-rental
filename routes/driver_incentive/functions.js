async function getIncentiveData(psql,data=null){
    let query = 'SELECT * FROM driver_incentive ';
    //Get data with ID 
    if (data){
        query += `WHERE driver_incentive_id = ${data.id};`
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

async function insertIncentiveData(psql,data){
    let query = 
    `INSERT INTO driver_incentive(booking_id,incentive)
     VALUES(${data.booking_id},${data.incentive})
     RETURNING *`;
    let result = await psql.query(query);
    return result.rows[0];  
}

async function updateIncentiveData(psql,data){
    let query = 
    `UPDATE driver_incentive 
    SET booking_id = ${data.booking_id},
        incentive = ${data.incentive}
    WHERE driver_incentive_id = ${data.id}
    RETURNING *`
    let result = await psql.query(query);
    if (!result.rowCount){
        err_msg='No data with the ID';
        throw err_msg;
    }
    return result.rows[0];
}

async function deleteIncentiveData(psql,data){
    let query = 
    `DELETE FROM driver_incentive
    WHERE driver_incentive_id = ${data.id}
    RETURNING *`;
    let result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){
        let err_msg='No data with the ID';
        throw err_msg;
    }
    return result.rows[0];
}
module.exports = {
    getIncentiveData,
    insertIncentiveData,
    updateIncentiveData,
    deleteIncentiveData
}
