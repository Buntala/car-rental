async function getIncentiveData(psql,id=null){
    let query = 
    'SELECT * FROM driver_incentive ';
    //Get data with ID 
    if (id !== null){
        query += `WHERE driver_incentive_id = ${id};`
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

async function insertIncentiveData(psql,booking_id,incentive){
    let query = 
    `INSERT INTO driver_incentive(booking_id,incentive)
     VALUES(${booking_id},${incentive});`
     console.log(query)
    _ = await psql.query(query);
    return; 
}

async function updateIncentiveData(psql,booking_id,incentive,id){
    let query = 
    `UPDATE driver_incentive 
    SET booking_id = ${booking_id},
        incentive = ${incentive}
    WHERE driver_id = ${id};`
    let result = await psql.query(query);
    if (!result.rowCount){
        err_msg='No data with the ID';
        throw err_msg;
    }
    return;
}

async function deleteIncentiveData(psql){
    let query = 
    `DELETE FROM driver_incentive
    WHERE driver_incentive_id = ${id}`;
    let result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){
        let err_msg='No data with the ID';
        throw err_msg;
    }
    return;
}

exports.getIncentiveData = getIncentiveData;
exports.insertIncentiveData = insertIncentiveData;
exports.updateIncentiveData = updateIncentiveData;
exports.deleteIncentiveData = deleteIncentiveData;