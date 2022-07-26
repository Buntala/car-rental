const express = require('express');

const router = express.Router();

const {
    getBookAll,
    getBookOne,
    postBook,
    patchBook,
    deleteBook
} = require('./requests');

router.get('/',getBookAll)
router.get('/:id',getBookOne)
router.post('/',postBook)
router.patch('/:id',patchBook)
router.delete('/:id',deleteBook)

module.exports = router