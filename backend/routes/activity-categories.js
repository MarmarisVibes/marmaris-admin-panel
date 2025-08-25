const express = require('express');
const { getData } = require('../utils');

const router = express.Router();

// GET all activity categories
router.get('/', (req, res) => {
  res.json(getData('activity-categories.json'));
});

module.exports = router;