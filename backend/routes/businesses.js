const express = require('express');
const { getData, saveData } = require('../utils');

const router = express.Router();

// GET all businesses
router.get('/', (req, res) => {
  const businesses = getData('businesses.json');
  res.json(businesses);
});

// GET business by ID
router.get('/:id', (req, res) => {
  const businesses = getData('businesses.json');
  const business = businesses.find(b => b.id === parseInt(req.params.id));
  if (!business) return res.status(404).json({ error: 'Business not found' });
  res.json(business);
});

// POST new business
router.post('/', (req, res) => {
  const businesses = getData('businesses.json');
  const newBusiness = req.body;
  newBusiness.id = businesses.length ? Math.max(...businesses.map(b => b.id)) + 1 : 1;
  businesses.push(newBusiness);
  saveData('businesses.json', businesses);
  res.status(201).json(newBusiness);
});

// PUT update business
router.put('/:id', (req, res) => {
  const businesses = getData('businesses.json');
  const index = businesses.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Business not found' });
  businesses[index] = { ...businesses[index], ...req.body };
  saveData('businesses.json', businesses);
  res.json(businesses[index]);
});

// DELETE business
router.delete('/:id', (req, res) => {
  const businesses = getData('businesses.json');
  const filtered = businesses.filter(b => b.id !== parseInt(req.params.id));
  if (filtered.length === businesses.length) {
    return res.status(404).json({ error: 'Business not found' });
  }
  saveData('businesses.json', filtered);
  res.status(204).send();
});

module.exports = router;