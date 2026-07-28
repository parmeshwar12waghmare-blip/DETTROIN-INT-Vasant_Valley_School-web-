const mongoose = require('mongoose');

const ERPUserSchema = new mongoose.Schema(
  {
    portalId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'parent', 'teacher', 'admin'],
      default: 'student',
    },
    grade: { type: String, default: 'Class X-A' },
    rollNo: { type: String, default: '2026-104' },
    parentName: { type: String, default: 'Rajesh Sharma' },
    attendanceRate: { type: Number, default: 96.5 },
    feeStatus: { type: String, default: 'Paid' },
    dueAmount: { type: Number, default: 0 },
    grades: [
      {
        subject: String,
        score: Number,
        grade: String,
        teacher: String,
      },
    ],
    schedule: [
      {
        day: String,
        period: String,
        subject: String,
        room: String,
        teacher: String,
      },
    ],
    notices: [
      {
        id: String,
        title: String,
        date: String,
        category: String,
        content: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('ERPUser', ERPUserSchema);
