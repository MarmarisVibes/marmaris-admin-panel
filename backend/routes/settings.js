const express = require('express');
const { getData, saveData } = require('../utils');

const router = express.Router();

// GET all settings
router.get('/', (req, res) => {
  res.json(getData('admin-settings.json'));
});

// PUT update all settings
router.put('/', (req, res) => {
  const settings = req.body;
  saveData('admin-settings.json', settings);
  res.json(settings);
});

module.exports = router;