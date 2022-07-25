async function getCarData(psql,data=null) {
    let query = 'SELECT * FROM cars ';
    //Get data with ID
    if (data){
        //add id condition
        query += `WHERE cars_id = ${data.id};`
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

async function insertCarData(psql,data)  {        
    let query = 
    `INSERT INTO cars(name,rent_price_daily,stock) 
    VALUES ('${data.name}',${data.rent_price_daily},${data.stock})
    RETURNING *
    `;
    let result = await psql.query(query);
    return result.rows[0];
}

async function updateCarData(psql,data){  
    let query =  
    `UPDATE cars 
    SET name = '${data.name}',
        rent_price_daily = ${data.rent_price_daily},
        stock = ${data.stock}
    WHERE cars_id = ${data.id}
    RETURNING *`;
    let result = await psql.query(query);
    //checks if data with id was updated
    if (!result.rowCount){
        err_msg='No data with the ID';
        throw err_msg;
    }
    return result.rows[0];
}

async function deleteCarData (psql,data) {
    let query = 
    `DELETE FROM cars
    WHERE cars_id = ${data.id}
    RETURNING *`;
    let result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){
        let err_msg='No data with the ID';
        throw err_msg;
    }
    return result.rows;
}


module.exports = {
    //Get all car data or get data by car id
    getCarData,
    insertCarData,
    updateCarData,
    deleteCarData
}
