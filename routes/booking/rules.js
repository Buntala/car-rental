const Joi = require("joi");
const BookingType = require("./value-object/booking-type");

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
    setBookingType() {
        this.booking_type = Joi.valid(
            BookingType.CAR_ONLY,
            BookingType.CAR_AND_DRIVER
        ).required();
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
        .setBookingType()
        .setDriverId()
    );

exports.updateBookingJoiValidation = Joi.object(
        new BookingValidation()
        .setBookId()
        .setCarsId()
        .setFinished()
        .setBookingType()
        .setDriverId()
    );

exports.deleteBookingJoiValidation = Joi.object(
        new BookingValidation()
        .setBookId()
    );