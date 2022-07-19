async function getCarData(id=null,psql){
    let query;
    let result;
    query = 'SELECT * FROM cars ';
    if (id !== null)query += `WHERE cars_id = ${id};`

    result = await psql.query(query);
    //ERROR HANDLING
    return result.rows;
}

async function insertCarData(psql,name,price,stock){
    let query;
    let result;
    
    query = 
    `INSERT INTO cars(name,rent_price_daily,stock) 
    VALUES ('${name}',${price},${stock})`;
    result = await psql.query(query);
    //ERROR HANDLING

    return;
}

async function updateCarData(psql,name,price,stock,id){
    let query;
    let result; 
    query =  
    `UPDATE cars 
    SET name = '${name}',
        rent_price_daily = ${price},
        stock = ${stock}
    WHERE cars_id = ${id}`;

    result = await psql.query(query);
    //ERROR HANDLING

    return ;//result.rows;
}
async function deleteCarData(psql,id){
    let query;
    let result;
    query = 
    `DELETE FROM cars
    WHERE cars_id = ${id}`;
    result = await psql.query(query);
    //ERROR HANDLING

    return ;//result;
}


exports.getCarData = getCarData;
exports.insertCarData = insertCarData;
exports.deleteCarData = deleteCarData;
exports.updateCarData = updateCarData;