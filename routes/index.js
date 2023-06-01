const express = require('express');
const router = express.Router();

const boardRoute = require('./board/boardRoute');

router.use('/board', boardRoute);

module.exports = router;