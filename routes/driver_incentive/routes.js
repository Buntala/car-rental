const express = require('express');

const router = express.Router();

const {
    getIncentiveAll,
    getIncentiveOne,
    postIncentive,
    patchIncentive,
    deleteIncentive
}= require('./requests');

router.get('/',getIncentiveAll)
router.get('/:id',getIncentiveOne)
router.post('/',postIncentive)
router.patch('/:id',patchIncentive)
router.delete('/:id',deleteIncentive)

module.exports = router