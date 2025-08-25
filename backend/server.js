// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const businessesRouter = require('./routes/businesses');
const categoriesRouter = require('./routes/categories');
const activityCategoriesRouter = require('./routes/activity-categories');
const signupsRouter = require('./routes/signups');
const mediaUploadsRouter = require('./routes/media-uploads');
const reviewReportsRouter = require('./routes/review-reports');
const settingsRouter = require('./routes/settings');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/businesses', businessesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/activity-categories', activityCategoriesRouter);
app.use('/api/signups', signupsRouter);
app.use('/api/media-uploads', mediaUploadsRouter);
app.use('/api/review-reports', reviewReportsRouter);
app.use('/api/settings', settingsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Marmaris Admin Panel API v1' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});