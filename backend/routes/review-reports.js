const express = require('express');
const { getData, saveData } = require('../utils');

const router = express.Router();

// GET all review reports
router.get('/', (req, res) => {
  res.json(getData('review-reports.json'));
});

// GET report by ID
router.get('/:id', (req, res) => {
  const reports = getData('review-reports.json');
  const report = reports.find(r => r.id === parseInt(req.params.id));
  if (!report) return res.status(404).json({ error: 'Report not found' });
  res.json(report);
});

// PUT update report status
router.put('/:id', (req, res) => {
  const reports = getData('review-reports.json');
  const index = reports.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Report not found' });
  reports[index] = { ...reports[index], ...req.body };
  saveData('review-reports.json', reports);
  res.json(reports[index]);
});

module.exports = router;