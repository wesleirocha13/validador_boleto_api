const express = require('express');
const router = express.Router();
const bankSlipController = require('../controllers/bankSlipController')

router.get('/', bankSlipController.get);

module.exports = router;
