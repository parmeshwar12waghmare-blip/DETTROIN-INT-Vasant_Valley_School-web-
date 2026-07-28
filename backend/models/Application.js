const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  parentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  grade: { type: String, required: true },
  previousSchool: { type: String },
  message: { type: String },
  status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
