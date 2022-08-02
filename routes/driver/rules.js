const Joi = require("joi");

class MembershipValidation {
    setId() {
        this.id = Joi.number().required();
        return this
    }
    setName() {
        this.name = Joi.string().required();
        return this
    }
    setNik(){
        this.nik = Joi.number().required();
        return this
    }
    setPhoneNumber(){
        this.phone_number = Joi.number().required();
        return this
    }
    setDailyCost(){
        this.daily_cost = Joi.number().required();
        return this
    }
}

const getDriverJoiValidation = Joi.object(
    new MembershipValidation()
    .setId()
);

const postDriverJoiValidation = Joi.object(
    new MembershipValidation()
    .setName()
    .setNik()
    .setPhoneNumber()
    .setDailyCost()
);
const updateDriverJoiValidation = Joi.object(
    new MembershipValidation()
    .setId()
    .setName()
    .setNik()
    .setPhoneNumber()
    .setDailyCost()
);

const deleteDriverJoiValidation = Joi.object(
    new MembershipValidation()
    .setId()
);

module.exports = {getDriverJoiValidation,postDriverJoiValidation,updateDriverJoiValidation,deleteDriverJoiValidation}