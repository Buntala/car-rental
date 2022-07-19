const Joi = require("joi");

//validate data string
function validate(schema, data) {
    const {error} = schema.validate(data)
    if (error)return error.message;
    return;
};
function integerParamValidate(data){

}
module.exports = validate