async function getDriverData(psql,id=null){
    let query = 
    'SELECT * FROM driver ';
    //Get data with ID 
    if (id !== null){
        query += `WHERE driver_id = ${id};`
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

async function insertDriverData(psql,name,nik,phone_number,daily_cost){
    let query = 
    `INSERT INTO driver(name,nik,phone_number,daily_cost) 
    VALUES ('${name}','${nik}','${phone_number}',${daily_cost})`;
    let result = await psql.query(query);
    return;
}

async function updateDriverData(psql,name,nik,phone_number,daily_cost,id){
    let query =  
    `UPDATE driver
    SET name = '${name}',
        nik = '${nik}',
        phone_number = '${phone_number}',
        daily_cost = ${daily_cost}
    WHERE driver_id = ${id};`
    let result = await psql.query(query);
    //checks if data with id was updated
    if (!result.rowCount){
        err_msg='No data with the ID';
        throw err_msg;
    }
    return;
}

async function deleteDriverData(psql,id){
    let query = 
    `DELETE FROM driver
    WHERE driver_id = ${id}`;
    let result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){
        let err_msg='No data with the ID';
        throw err_msg;
    }
    return;
}

exports.getDriverData = getDriverData;
exports.insertDriverData = insertDriverData;
exports.deleteDriverData = deleteDriverData;
exports.updateDriverData = updateDriverData;