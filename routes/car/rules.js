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

getCarJoiValidation = Joi.object(
    new CarsValidation()
    .setId()
);

postCarJoiValidation = Joi.object(
    new CarsValidation()
    .setName()
    .setRentPriceDaily()
    .setStock()
);

updateCarJoiValidation = Joi.object(
    new CarsValidation()
    .setId()
    .setName()
    .setRentPriceDaily()
    .setStock()
);

deleteCarJoiValidation = Joi.object(
    new CarsValidation()
    .setId()
);

module.exports ={
    getCarJoiValidation,
    postCarJoiValidation,
    updateCarJoiValidation,
    deleteCarJoiValidation
}