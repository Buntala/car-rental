const express = require('express');

const router = express.Router();

const {
    getMemberAll,
    getMemberOne,
    postMember,
    patchMember,
    deleteMember
} = require('./requests');

router.get('/',getMemberAll)
router.get('/:id',getMemberOne)
router.post('/',postMember)
router.patch('/:id',patchMember)
router.delete('/:id',deleteMember)

module.exports = router