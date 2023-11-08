const express = require('express');
const pool = require('./database/db');

const router = express.Router();

// READ ALL
router.get('/', async (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      next(err);
      pool.end();
      return;
    }

    connection.query('USE doughnut_ville', (err, results) => {
      if (err) {
        connection.release();
        next(err);
        return;
      }
    });

    const query = `SELECT * FROM doughnut_list`;

    connection.query(query, (err, results, fields) => {
      if (err) {
        next(err);
        return;
      }

      res.status(200);
      res.json(results);
      connection.release();
    });
  });
});

function parseBody(body) {
  const { doughnutName, doughnutType, doughnutCost } = body;

  const doughnut = {
    doughnutName,
    doughnutType,
    doughnutCost,
  };

  return doughnut;
}

// CREATE ONE
router.post('/', (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      next(err);
      pool.end();
      return;
    }

    connection.query('USE doughnut_ville', (err, results, fields) => {
      if (err) {
        connection.release();
        next(err);
        return;
      }
    });

    const doughnut = parseBody(req.body);

    const { doughnutName, doughnutType, doughnutCost } = doughnut;

    const query =
      'INSERT INTO doughnut_list (doughnut_name, doughnut_type, doughnut_cost) VALUES (?, ?, ?)';

    const values = [doughnutName, doughnutType, doughnutCost];

    connection.query(query, values, (error, results, fields) => {
      if (error) {
        next(error);
        return;
      }

      res.status(200);
      res.json(results);
      connection.release();
    });
  });
});

module.exports = router;
