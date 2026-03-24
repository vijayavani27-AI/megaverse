const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH mark message as read
router.patch('/:id/read', async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(req.params.id, { unread: false }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST send a new message
router.post('/', async (req, res) => {
  try {
    const msg = new Message(req.body);
    const saved = await msg.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE message
router.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
