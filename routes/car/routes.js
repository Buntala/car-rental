const express = require('express');

const router = express.Router();

const {
    getCarAll,
    getCarOne,
    postCar,
    patchCar,
    deleteCar
} = require('./requests');

router.get('/',getCarAll)
router.get('/:id',getCarOne)
router.post('/',postCar)
router.patch('/:id',patchCar)
router.delete('/:id',deleteCar)

module.exports = router