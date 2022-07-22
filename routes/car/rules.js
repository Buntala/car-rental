const Joi = require("joi");

class CarsValidation {
    setId() {
        this.id = Joi.number().required();
        return this
    }

    setName() {
        this.name = Joi.string().required();
        return this
    }

    setRentPriceDaily() {
        this.rent_price_daily = Joi.number().required();
        return this
    }

    setStock() {
        this.stock = Joi.number().required();
        return this
    }
}

exports.getCarJoiValidation = Joi.object(
        new CarsValidation()
        .setId()
    );

exports.postCarJoiValidation = Joi.object(
        new CarsValidation()
        .setName()
        .setRentPriceDaily()
        .setStock()
    );

exports.updateCarJoiValidation = Joi.object(
        new CarsValidation()
        .setId()
        .setName()
        .setRentPriceDaily()
        .setStock()
    );

exports.deleteCarJoiValidation = Joi.object(
        new CarsValidation()
        .setId()
    );