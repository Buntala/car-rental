async function getCustomerData(id=null,psql){
    let query;
    let result;
    query = 'SELECT * FROM customer ';
    if (id !== null)query += `WHERE customer_id = ${id};`

    result = await psql.query(query);
    //ERROR HANDLING
    return result.rows;
}

async function insertCustomerData(psql,name,nik,phone_number){
    let query;
    let result;
    
    query = 
    `INSERT INTO customer(name,nik,phone_number)
    VALUES ('${name}',${nik},${phone_number})`;
    result = await psql.query(query);
    //ERROR HANDLING

    return;
}
async function updateCustomerData(psql,name,nik,phone_number,id){
    let query;
    let result; 
    query =  
    `UPDATE customer 
    SET name = '${name}',
        nik = '${nik}',
        phone_number = '${phone_number}'
    WHERE customer_id = ${id}`;

    result = await psql.query(query);
    //ERROR HANDLING

    return ;//result.rows;
}
async function deleteCustomerData(psql,id){
    let query;
    let result;
    query = 
    `DELETE FROM customer
    WHERE customer_id = ${id}`;
    result = await psql.query(query);
    //ERROR HANDLING

    return ;//result;
}

exports.getCustomerData = getCustomerData;
exports.insertCustomerData = insertCustomerData;
exports.updateCustomerData = updateCustomerData;
exports.deleteCustomerData = deleteCustomerData;
