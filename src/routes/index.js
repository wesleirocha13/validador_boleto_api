const express = require('express');
const router = express.Router();

const main = require('./main');
const bankSlip = require('./bankSlip');

//Rota padrão da API
router.use('/', main);

//Rota para obter as informações de um boleto
router.use('/boleto', bankSlip);

module.exports = router;
