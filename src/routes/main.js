const express = require('express');
const router = express.Router();
const { version } = require('../../package.json');

router.get('/', async (req, res) => {
  return res.status(200).json({
    running: true,
    timestamp: new Date().getTime(),
    version,
  });
});

module.exports = router;
