const Joi = require("joi");

function dataValidate(schema, data) {
    const {error} = schema.validate(data)
    if (error){
        throw error.message;
    }
    return;
};

//delete this later
module.exports={
    dataValidate
}