const express = require('express');
const connection = require('./database/db');

const router = express.Router();

// READ ALL
router.get('/', async (req, res, next) => {
  const query = `SELECT * FROM doughnut_list`;
  connection.query(query, (err, results, fields) => {
    if (err) {
      next(err);
      return;
    }

    res.status(200);
    res.json(results);
  });
});

module.exports = router;
