const mongoose = require('mongoose');

const ERPRecordSchema = new mongoose.Schema(
  {
    recordType: { type: String, required: true }, // 'attendance', 'grade', 'fee', 'query_log'
    portalId: { type: String, required: true },
    title: { type: String, required: true },
    details: { type: Object, default: {} },
    status: { type: String, default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ERPRecord', ERPRecordSchema);
