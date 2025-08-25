const express = require('express');
const { getData, saveData } = require('../utils');

const router = express.Router();

// GET all media uploads
router.get('/', (req, res) => {
  res.json(getData('media-uploads.json'));
});

// GET media upload by ID
router.get('/:id', (req, res) => {
  const uploads = getData('media-uploads.json');
  const upload = uploads.find(u => u.id === parseInt(req.params.id));
  if (!upload) return res.status(404).json({ error: 'Media upload not found' });
  res.json(upload);
});

// PUT update media upload (e.g., approve/reject)
router.put('/:id', (req, res) => {
  const uploads = getData('media-uploads.json');
  const index = uploads.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Media upload not found' });
  uploads[index] = { ...uploads[index], ...req.body };
  saveData('media-uploads.json', uploads);
  res.json(uploads[index]);
});

module.exports = router;