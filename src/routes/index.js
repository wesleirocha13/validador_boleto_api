const express = require('express');
const router = express.Router();

const main = require('./main');
const bankSlip = require('./bankSlip');

router.use('/', main);
router.use('/boleto', bankSlip);

module.exports = router;
