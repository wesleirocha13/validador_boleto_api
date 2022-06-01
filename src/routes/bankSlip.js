const express = require('express');
const router = express.Router();
const bankSlipController = require('../controllers/bankSlipController')

router.get('/:code', bankSlipController.get);

module.exports = router;
