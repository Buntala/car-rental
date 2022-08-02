const Joi = require("joi");

class IncentiveValidation {
    setId() {
        this.id = Joi.number().required();
        return this
    }

    setBookingId() {
        this.booking_id = Joi.number().required();
        return this
    }

    setIncentive() {
        this.incentive = Joi.number().required();
        return this
    }
}

getIncentiveJoiValidation = Joi.object(
    new IncentiveValidation()
    .setId()
);

postIncentiveJoiValidation = Joi.object(
    new IncentiveValidation()
    .setBookingId()
    .setIncentive()
)
updateIncentiveJoiValidation = Joi.object(
    new IncentiveValidation()
    .setId()
    .setBookingId()
    .setIncentive()
)
deleteIncentiveJoiValidation = Joi.object(
    new IncentiveValidation()
    .setId()
)

module.exports ={
    getIncentiveJoiValidation,
    postIncentiveJoiValidation,
    updateIncentiveJoiValidation,
    deleteIncentiveJoiValidation
}