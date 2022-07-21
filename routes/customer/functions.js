async function getCustomerData(psql,id=null){
    //select all with date convert to string
    let query = 'SELECT * FROM customer ';
    //Get data with id
    if (id !== null){
        //check if id is numeric
        query += `WHERE customer_id = ${id};`
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

async function insertCustomerData(psql,name,nik,phone_number,membership_id=null){
    let query = 
    `INSERT INTO customer(name,nik,phone_number,membership_id)
    VALUES ('${name}',${nik},'${phone_number}',${membership_id})`;
    result = await psql.query(query);
    return;
}
async function updateCustomerData(psql,name,nik,phone_number,id){
    let query =  
    `UPDATE customer 
    SET name = '${name}',
        nik = '${nik}',
        phone_number = '${phone_number}'
    WHERE customer_id = ${id}`;

    let result = await psql.query(query);
    //checks if data with id was updated
    if (!result.rowCount){
        let err_msg='No data with the ID';
        throw err_msg;
    }
    return;
}
async function deleteCustomerData(psql,id){
    let query = 
    `DELETE FROM customer
    WHERE customer_id = ${id}`;
    let result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){
        let err_msg='No data with the ID'
        throw err_msg;
    }
    return;
}

exports.getCustomerData = getCustomerData;
exports.insertCustomerData = insertCustomerData;
exports.updateCustomerData = updateCustomerData;
exports.deleteCustomerData = deleteCustomerData;
