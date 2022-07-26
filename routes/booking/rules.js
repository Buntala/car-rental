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
        this.driver_id = Joi.number().required();
        return this
    }
}

exports.getBookingJoiValidation = Joi.object(
        new BookingValidation()
        .setBookId()
    );

exports.postBookingJoiValidation = Joi.object(
        new BookingValidation()
        .setCustId() 
        .setCarsId()
        .setStartTime()
        .setEndTime()
        .setFinished()
        .setBookingTypeId()
        .setDriverId()
    );

exports.updateBookingJoiValidation = Joi.object(
        new BookingValidation()
        .setBookId()
        .setCustId() 
        .setCarsId()
        .setStartTime()
        .setEndTime()
        .setFinished()
        .setBookingTypeId()
        .setDriverId()
    );

exports.deleteBookingJoiValidation = Joi.object(
        new BookingValidation()
        .setBookId()
    );