const Joi = require("joi");

class CustValidation {
    
    setId() {
        this.id = Joi.number().required();
        return this
    }

    setName() {
        this.name = Joi.string().required();
        return this
    }

    setNik() {
        this.nik = Joi.number().required();
        return this
    }

    setPhoneNumber() {
        this.phone_number = Joi.number().required();
        return this
    }

    setMembership() {
        this.membership_id = Joi.number();
        return this
    }
}

exports.getCustJoiValidation = Joi.object(
        new CustValidation()
        .setId()
    );

exports.postCustJoiValidation = Joi.object(
        new CustValidation()
        .setName()
        .setNik()
        .setPhoneNumber()
        .setMembership()
    );

exports.updateCustJoiValidation = Joi.object(
        new CustValidation()
        .setId()
        .setName()
        .setNik()
        .setPhoneNumber()
        .setMembership()
    );

exports.deleteCustJoiValidation = Joi.object(
        new CustValidation()
        .setId()
    );