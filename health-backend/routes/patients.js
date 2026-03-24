const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// GET all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single patient by patientId
router.get('/:patientId', async (req, res) => {
  try {
    const patient = await Patient.findOne({ patientId: req.params.patientId });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new patient
router.post('/', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const saved = await patient.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update patient vitals
router.patch('/:patientId/vitals', async (req, res) => {
  try {
    const updated = await Patient.findOneAndUpdate(
      { patientId: req.params.patientId },
      { $set: { vitals: req.body } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Patient not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update patient status
router.patch('/:patientId/status', async (req, res) => {
  try {
    const updated = await Patient.findOneAndUpdate(
      { patientId: req.params.patientId },
      { $set: { status: req.body.status } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Patient not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE patient
router.delete('/:patientId', async (req, res) => {
  try {
    await Patient.findOneAndDelete({ patientId: req.params.patientId });
    res.json({ message: 'Patient removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
