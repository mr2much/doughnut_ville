const express = require('express');

const doughnuts = require('./doughnuts');

const router = express.Router();

router.get('/', (req, res) => {
  //res.json({ message: `Hello from API` });
  res.render('home', { title: 'Welcome to Doughnut Ville' });
});

router.get('/ratings', (req, res) => {
  res.render('ratings', { title: 'View Doughnut Ratings' });
});

router.get('/newrating', (req, res) => {
  res.render('newrating', { title: 'Create New Rating' });
});

router.get('/new', (req, res) => {
  res.render('new', { title: 'Create New Doughnut' });
});

// REDIRECT TO doughnut.js
router.use('/doughnuts', doughnuts);

module.exports = router;
