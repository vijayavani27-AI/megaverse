const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  name: { type: String, required: true },
  age: Number,
  admitted: String,
  discharged: String,
  diagnosis: String,
  doctor: String,
  dosage: { type: String, default: 'Not specified' },
  status: { type: String, enum: ['Admitted', 'Discharged', 'Follow-up'], default: 'Admitted' },
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);
