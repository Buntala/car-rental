const express = require('express');

const router = express.Router();

const {
    getBookAll,
    getBookOne,
    postBook,
    patchBook,
    deleteBook,
    finishBook,
    cancelBook,
    extendBook
} = require('./requests');

router.get('/',getBookAll)
router.get('/:id',getBookOne)
router.post('/',postBook)
router.patch('/:id',patchBook)
router.delete('/:id',deleteBook)
router.post('/finish/:id',finishBook)
router.post('/cancel/:id',cancelBook)
router.post('/extend/:id',extendBook)

module.exports = router