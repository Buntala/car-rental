const express = require('express');

const router = express.Router();

const {getCustAll,getCustOne,postCust,patchCust,deleteCust} = require('./requests');

router.get('/',getCustAll)
router.get('/:id',getCustOne)
router.post('/',postCust)
router.patch('/:id',patchCust)
router.delete('/:id',deleteCust)

module.exports = router