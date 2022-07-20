const Joi = require("joi");

//validate data string
function bodyValidate(schema, data) {
    const {error} = schema.validate(data)
    if (error){
        throw error.message;
    }
    return;
};
function integerParamValidate(id){
    schema = Joi.number();
    //check if id is numeric
    const {error} = schema.validate(id)
    if (error){
        err_msg=error.message
        throw err_msg;
    }
    return;
}
exports.bodyValidate=bodyValidate
exports.integerParamValidate = integerParamValidate