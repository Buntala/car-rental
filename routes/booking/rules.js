const Joi = require("joi");

class BookingValidation {
    setBookId() {
        this.id = Joi.number().required();
        return this
    }

    setCustId() {
        this.customer_id = Joi.number().required();
        return this
    }

    setCarsId() {
        this.cars_id = Joi.number().required();
        return this
    }

    setStartTime() {
        this.start_time = Joi.date().required();
        return this
    }
    setEndTime() {
        this.end_time = Joi.date().required();
        return this
    }
    setTotalCost() {
        this.total_cost = Joi.number().required();
        return this
    }
    setFinished() {
        this.finished = Joi.boolean().required();
        return this
    }
    setBookingTypeId() {
        this.booking_type_id = Joi.number().required();
        return this
    }
    setDriverId() {
        this.driver_id = Joi.when('booking_type_id',{ is: '2', then: Joi.number().required() });
        return this
    }
}
const getBookingJoiValidation = Joi.object(
    new BookingValidation()
    .setBookId()
);

const postBookingJoiValidation = Joi.object(
    new BookingValidation()
    .setCustId() 
    .setCarsId()
    .setStartTime()
    .setEndTime()
    //.setFinished()
    .setBookingTypeId()
    .setDriverId()
);

const updateBookingJoiValidation = Joi.object(
    new BookingValidation()
    .setBookId()
    .setCustId() 
    .setCarsId()
    .setFinished()
    .setBookingTypeId()
    .setDriverId()
);

const deleteBookingJoiValidation = Joi.object(
    new BookingValidation()
    .setBookId()
);

const finishBookingJoiValidation = Joi.object(
    new BookingValidation()
    .setBookId()
);

const cancelBookingJoiValidation = Joi.object(
    new BookingValidation()
    .setBookId()
);

const extendBookingJoiValidation = Joi.object(
    new BookingValidation()
    .setBookId()
    .setEndTime()
);

module.exports = {
    getBookingJoiValidation,
    postBookingJoiValidation,
    updateBookingJoiValidation,
    deleteBookingJoiValidation,
    finishBookingJoiValidation,
    cancelBookingJoiValidation,
    extendBookingJoiValidation
}
