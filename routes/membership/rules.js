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
    setDiscount(){
        this.discount = Joi.number().min(0).max(100).required();
        return this
    }
}

const getMembershipJoiValidation = Joi.object(
    new MembershipValidation()
    .setId()
);

const postMembershipJoiValidation = Joi.object(
    new MembershipValidation()
    .setName()
    .setDiscount()
);
const updateMembershipJoiValidation = Joi.object(
    new MembershipValidation()
    .setId()
    .setName()
    .setDiscount()
);

const deleteMembershipJoiValidation = Joi.object(
    new MembershipValidation()
    .setId()
);

module.exports = {getMembershipJoiValidation,postMembershipJoiValidation,updateMembershipJoiValidation,deleteMembershipJoiValidation}