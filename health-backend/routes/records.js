const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

// GET all records (with optional search query)
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q 
      ? { $or: [
          { name: { $regex: q, $options: 'i' } },
          { patientId: { $regex: q, $options: 'i' } },
          { diagnosis: { $regex: q, $options: 'i' } },
        ]}
      : {};
    const records = await Record.find(filter).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single record
router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add a new record
router.post('/', async (req, res) => {
  try {
    const record = new Record(req.body);
    const saved = await record.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update record
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Record not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE record
router.delete('/:id', async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
