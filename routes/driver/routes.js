const express = require('express');

const router = express.Router();

const {
    getDriverAll,
    getDriverOne,
    postDriver,
    patchDriver,
    deleteDriver
} = require('./requests');

router.get('/',getDriverAll)
router.get('/:id',getDriverOne)
router.post('/',postDriver)
router.patch('/:id',patchDriver)
router.delete('/:id',deleteDriver)

module.exports = router