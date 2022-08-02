async function getMembershipData(psql,data=null){
    let query = 
    'SELECT * FROM membership ';
    //Get data with ID 
    if (data){
        query += `WHERE membership_id = ${data.id};`
        let result = await psql.query(query);
        //check if query is successful
        if (result.rowCount===0){
            let err_msg="ID is invalid!";
            throw new Error(err_msg);
        }
        return result.rows[0];
    }
    let result = await psql.query(query);
    return result.rows;
}
async function insertMembershipData(psql,data){
    let query = 
    `INSERT INTO membership(name,discount)
      VALUES('${data.name}',${data.discount})
      RETURNING *`;
    result = await psql.query(query);
    return result.rows[0]; 
}

async function updateMembershipData(psql,data){
    let query = 
    `UPDATE membership 
    SET name = '${data.name}',
        discount = ${data.discount}
    WHERE membership_id = ${data.id}
    RETURNING *`;
    console.log(query)
    let result = await psql.query(query);
    if (!result.rowCount){
        err_msg='No data with the ID';
        throw new Error(err_msg);
    }
    return result.rows[0]; 
}

async function deleteMembershipData(psql,data){
    let query = 
    `DELETE FROM membership
    WHERE membership_id = ${data.id}
    RETURNING *`;
    let result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){
        let err_msg='No data with the ID';
        throw new Error(err_msg);
    }
    return result.rows[0]; 
}
module.exports = {
    getMembershipData,
    insertMembershipData,
    deleteMembershipData,
    updateMembershipData
}