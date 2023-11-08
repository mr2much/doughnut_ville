const express = require('express');
const pool = require('./database/db');

const router = express.Router();

// READ ALL RATINS
router.get('/ratings', async (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      next(err);
      pool.end();
      return;
    }

    const query = 'SELECT * FROM doughnut_ratings';

    connection.query(query, (err, results, fields) => {
      if (err) {
        next(err);
        connection.release();
        return;
      }

      res.status(200);
      res.json(results);
    });
  });
});

// READ ALL
router.get('/', async (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      next(err);
      pool.end();
      return;
    }

    const query = `SELECT * FROM doughnut_list`;

    connection.query(query, (err, results, fields) => {
      if (err) {
        next(err);
        connection.release();
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

// CREATE ONE RATING
router.post('/ratings', (req, res, next) => {
  const query =
    'INSERT INTO doughnut_ratings (location, time, date, type, rating, comments) VALUES(?, ?, ?, ?, ?, ?)';

  //     INSERT INTO doughnut_ratings (location, time, date, type, rating, comments)
  // VALUES("Duncan\'s Donuts", "19:58:00", STR_TO_DATE('4/26', '%m/%d'), "jelly", 6, "stale, but tasty");

  res.status(200);
  res.json({ message: 'Received a request to create one rating' });
});

// CREATE ONE
router.post('/', (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      next(err);
      pool.end();
      return;
    }

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
