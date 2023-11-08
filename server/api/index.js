const express = require('express');

const doughnuts = require('./doughnuts');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: `Hello from API` });
});

// REDIRECT TO doughnut.js
router.use('/doughnuts', doughnuts);

module.exports = router;
