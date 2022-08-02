async function getCustData(psql,data=null){
    //select all with date convert to string
    let query = 'SELECT * FROM customer ';
    //Get data with id
    if (data !== null){
        //check if id is numeric
        query += `WHERE customer_id = ${data.id};`
        let result = await psql.query(query);
        //check if query is successful
        if (result.rowCount===0){
            let err_msg="ID is invalid!";
            throw new Error(err_msg);
        }
        return result.rows[0];
    }
    query += `ORDER BY customer_id DESC`
    let result = await psql.query(query);
    return result.rows;
}

async function insertCustData(psql,data){
    let query = 
    `INSERT INTO customer(name,nik,phone_number,membership_id)
    VALUES ('${data.name}',${data.nik},'${data.phone_number}',${data.membership_id?data.membership_id:null})
    RETURNING *`;
    result = await psql.query(query);
    return result.rows[0];
}
async function updateCustData(psql,data){
    let query =  
    `UPDATE customer 
    SET name = '${data.name}',
        nik = '${data.nik}',
        phone_number = '${data.phone_number}',
        membership_id = ${data.membership_id? data.membership_id : null}
    WHERE customer_id = ${data.id}
    RETURNING *`;
    let result = await psql.query(query);
    //checks if data with id was updated
    if (!result.rowCount){
        let err_msg='No data with the ID';
        throw new Error(err_msg);
    }
    return result.rows[0];
}
async function deleteCustData(psql,data){
    let query = 
    `DELETE FROM customer
    WHERE customer_id = ${data.id}
    RETURNING *`;
    let result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){
        let err_msg='No data with the ID'
        throw new Error(err_msg);
    }
    return result.rows[0];
}

module.exports={
    getCustData,
    insertCustData,
    updateCustData,
    deleteCustData
}

