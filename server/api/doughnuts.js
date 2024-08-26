const express = require('express');
const pool = require('./database/db');
const operatorHandler = require(`./database/mysql/operators`);

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

// READ ENTRIES WITH FILTER QUERY
router.get('/:filter', async (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      next(err);
      pool.end();
      return;
    }

    const searchCriteria = JSON.parse(req.query.searchTerms);

    const sqlQuery = operatorHandler(searchCriteria);

    connection.query(sqlQuery, (err, results, fields) => {
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

function parseRateFromBody(body) {
  const { location, time, monthDay, doughnut_type, rating, comments } = body;
  const rate = { location, time, monthDay, doughnut_type, rating, comments };

  return rate;
}
// CREATE ONE RATING
router.post('/ratings', (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      next(err);
      pool.end();
      return;
    }

    const rate = parseRateFromBody(req.body);
    const query =
      "INSERT INTO doughnut_ratings (location, time, date, type, rating, comments) VALUES(?, ?, STR_TO_DATE(?, '%m/%d'), ?, ?, ?)";

    const { location, time, monthDay, doughnut_type, rating, comments } = rate;
    const values = [location, time, monthDay, doughnut_type, rating, comments];

    connection.query(query, values, (error, results, fields) => {
      if (error) {
        next(error);
        connection.release();
        return;
      }

      res.status(200);
      res.json(results);
      connection.release();
    });
  });
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
        connection.release();
        return;
      }

      res.status(200);
      res.json(results);
      connection.release();
    });
  });
});

module.exports = router;
