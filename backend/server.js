const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectToDatabase = require('./config/db');
const Application = require('./models/Application');
const Inquiry = require('./models/Inquiry');
const erpRoutes = require('./routes/erpRoutes');
const instagramRoutes = require('./routes/instagram');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS ─────────────────────────────────────────────────────────────────────
// Allow requests from the Vercel frontend. Set ALLOWED_ORIGIN in Render env vars.
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(',') : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};
app.use(cors(corsOptions));
app.use(express.json());

// ERP Routes
app.use('/api/erp', erpRoutes);

// Instagram Feed Routes
app.use('/api/instagram', instagramRoutes);

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

// Admissions API - Delete Application
app.delete('/api/admissions/:id', async (req, res) => {
  try {
    await connectToDatabase();
    await Application.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting admission application:', error);
    res.status(500).json({ success: false, message: 'Failed to delete application', error: error.message });
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

// Contact API - Retrieve Inquiries (For Admin & Teacher ERP dashboard)
app.get('/api/contact', async (req, res) => {
  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching contact inquiries:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Contact API - Delete Inquiry
app.delete('/api/contact/:id', async (req, res) => {
  try {
    await connectToDatabase();
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ success: false, message: 'Failed to delete inquiry', error: error.message });
  }
});

// Always start the server (Render and other hosts need the process to bind to PORT)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;
