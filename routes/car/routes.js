const express = require('express');

const router = express.Router();

const {getAllCar,getOneCar,postCar,patchCar,deleteCar} = require('./requests');

router.get('/',getAllCar)
router.get('/:id',getOneCar)
router.post('/',postCar)
router.patch('/:id',patchCar)
router.delete('/:id',deleteCar)

module.exports = router