async function getMembershipData(psql,id=null){
    let query = 
    'SELECT * FROM membership ';
    //Get data with ID 
    if (id !== null){
        query += `WHERE membership_id = ${id};`
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
async function insertMembershipData(psql,membership_name,discount){
    let query = 
    `INSERT INTO membership(membership_name,discount)
      VALUES('${membership_name}',${discount})`
    _ = await psql.query(query);
    return; 
}

async function updateMembershipData(psql,membership_name,discount,id){
    let query = 
    `UPDATE membership 
    SET membership_name = '${membership_name}',
        discount = ${discount}
    WHERE membership_id = ${id};`
    let result = await psql.query(query);
    if (!result.rowCount){
        err_msg='No data with the ID';
        throw err_msg;
    }
    return;
}

async function deleteMembershipData(psql){
    let query = 
    `DELETE FROM membership
    WHERE membership_id = ${id}`;
    let result = await psql.query(query);
    //checks if data with id was deleted
    if (!result.rowCount){
        let err_msg='No data with the ID';
        throw err_msg;
    }
    return;
}


exports.getMembershipData = getMembershipData;
exports.insertMembershipData = insertMembershipData;
exports.deleteMembershipData = deleteMembershipData;
exports.updateMembershipData = updateMembershipData;