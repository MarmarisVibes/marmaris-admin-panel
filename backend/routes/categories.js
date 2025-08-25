const express = require('express');
const { getData } = require('../utils');

const router = express.Router();

// GET all business categories
router.get('/', (req, res) => {
  res.json(getData('business-categories.json'));
});

module.exports = router;