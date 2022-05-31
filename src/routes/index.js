const express = require('express');
const router = express.Router();

const main = require('./main');
// const boleto = require('./boleto');

router.use('/', main);
// router.use('/boleto', boleto);

module.exports = router;
