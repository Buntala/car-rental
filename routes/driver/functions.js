async function getDriverData(psql,data=null){
    let query = 
    'SELECT * FROM driver ';
    //Get data with ID 
    if (data){
        query += `WHERE driver_id = ${data.id};`
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

async function insertDriverData(psql,data){
    let query = 
    `INSERT INTO driver(name,nik,phone_number,daily_cost) 
    VALUES ('${data.name}','${data.nik}','${data.phone_number}',${data.daily_cost})
    RETURNING *`;
    let result = await psql.query(query);
    return result.rows[0];
}

async function updateDriverData(psql,data){
    let query =  
    `UPDATE driver
    SET name = '${data.name}',
        nik = '${data.nik}',
        phone_number = '${data.phone_number}',
        daily_cost = ${data.daily_cost}
    WHERE driver_id = ${data.id}
    RETURNING *`;
    let result = await psql.query(query);
    //checks if data with id was updated
    if (!result.rowCount){
        err_msg='No data with the ID';
        throw err_msg;
    }
    return result.rows[0];
}

async function deleteDriverData(psql,data){
    let query = 
    `DELETE FROM driver
    WHERE driver_id = ${data.id}
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
    getDriverData,
    insertDriverData,
    updateDriverData,
    deleteDriverData
}
