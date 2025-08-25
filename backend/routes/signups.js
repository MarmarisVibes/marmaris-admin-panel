const express = require('express');
const { getData, saveData } = require('../utils');

const router = express.Router();

// GET all signups
router.get('/', (req, res) => {
  res.json(getData('business-signups.json'));
});

// GET signup by ID
router.get('/:id', (req, res) => {
  const signups = getData('business-signups.json');
  const signup = signups.find(s => s.id === parseInt(req.params.id));
  if (!signup) return res.status(404).json({ error: 'Signup not found' });
  res.json(signup);
});

// PUT update signup (e.g., approve/reject)
router.put('/:id', (req, res) => {
  const signups = getData('business-signups.json');
  const index = signups.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Signup not found' });
  signups[index] = { ...signups[index], ...req.body };
  saveData('business-signups.json', signups);
  res.json(signups[index]);
});

module.exports = router;