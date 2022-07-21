//Get all car data or get data by car id
async function getCarData(psql,id=null){
    let query = 'SELECT * FROM cars ';
    //Get data with ID
    if (id !== null){
        //add id condition
        query += `WHERE cars_id = ${id};`
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


async function insertCarData(psql,name,price,stock){
    let query = 
    `INSERT INTO cars(name,rent_price_daily,stock) 
    VALUES ('${name}',${price},${stock})`;
    let result = await psql.query(query);
    return;
}

async function updateCarData(psql,name,price,stock,id){
    let query =  
    `UPDATE cars 
    SET name = '${name}',
        rent_price_daily = ${price},
        stock = ${stock}
    WHERE cars_id = ${id}`;

    let result = await psql.query(query);
    //checks if data with id was updated
    if (!result.rowCount){
        err_msg='No data with the ID';
        throw err_msg;
    }
    return err_msg;
}

async function deleteCarData(psql,id){
    let query = 
    `DELETE FROM cars
    WHERE cars_id = ${id}`;
    let result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){
        let err_msg='No data with the ID';
        throw err_msg;
    }
    return err_msg;
}

exports.getCarData = getCarData;
exports.insertCarData = insertCarData;
exports.deleteCarData = deleteCarData;
exports.updateCarData = updateCarData;