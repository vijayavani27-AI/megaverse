const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  hr: Number,
  spo2: Number,
  sys: Number,
  dia: Number,
  temp: Number,
  rr: Number,
});

const patientSchema = new mongoose.Schema({
  patientId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  age: Number,
  blood: String,
  bed: String,
  status: { type: String, enum: ['Critical', 'Stable', 'Observation'], default: 'Stable' },
  diagnosis: String,
  doctor: String,
  admitted: { type: Date, default: Date.now },
  discharged: Date,
  color: String,
  vitals: { type: vitalSchema, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
