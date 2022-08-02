const Joi = require("joi");
const { BookingType }= require("./value-object/booking-type");

class BookingValidation {
    setBookId() {
        this.id = Joi.number().required();
        return this
    }

    setCustId() {
        this.customer_id = Joi.number().required();
        return this
    }

    setCarId() {
        this.car_id = Joi.number().required();
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
        this.driver_id = Joi.when('booking_type',{ is: 'Car & Driver', then: Joi.number().required(), otherwise: null});
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
    .setCarId()
    .setStartTime()
    .setEndTime()
    .setBookingType()
    .setDriverId()
);

const updateBookingJoiValidation = Joi.object(
    new BookingValidation()
    .setBookId()
    .setCarId()
    .setFinished()
    .setBookingType()
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
