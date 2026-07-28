const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectToDatabase = require('./config/db');
const Application = require('./models/Application');
const Inquiry = require('./models/Inquiry');
const erpRoutes = require('./routes/erpRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ERP Routes
app.use('/api/erp', erpRoutes);

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Vasant Valley School Backend API (MongoDB) is operational' });
});

// Admissions API - Submit Application
app.post('/api/admissions', async (req, res) => {
  try {
    await connectToDatabase();
    const newApp = new Application(req.body);
    const savedApp = await newApp.save();
    res.status(201).json({ success: true, message: 'Application submitted successfully', id: savedApp._id });
  } catch (error) {
    console.error('Error saving admission application:', error);
    res.status(500).json({ success: false, message: 'Failed to record application in database', error: error.message });
  }
});

// Admissions API - Retrieve Applications
app.get('/api/admissions', async (req, res) => {
  try {
    await connectToDatabase();
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Contact API - Submit Inquiry
app.post('/api/contact', async (req, res) => {
  try {
    await connectToDatabase();
    const newInquiry = new Inquiry(req.body);
    await newInquiry.save();
    res.status(201).json({ success: true, message: 'Inquiry saved successfully' });
  } catch (error) {
    console.error('Error saving contact inquiry:', error);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry', error: error.message });
  }
});

// For Vercel Serverless Export & Local Express execution
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Vasant Valley School Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
