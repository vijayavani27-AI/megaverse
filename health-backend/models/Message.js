const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  dept: String,
  avatar: String,
  color: String,
  subject: String,
  body: String,
  unread: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
