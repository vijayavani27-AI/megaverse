require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const patientRoutes = require('./routes/patients');
const recordRoutes  = require('./routes/records');
const messageRoutes = require('./routes/messages');

const app = express();

// ── Middleware ─────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5174' }));
app.use(express.json());

// ── API Routes ─────────────────────────────────────────
app.use('/api/patients', patientRoutes);
app.use('/api/records',  recordRoutes);
app.use('/api/messages', messageRoutes);

// ── Health Check ───────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'HealthSync API is running',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// ── 404 Handler ────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} not found` });
});

// ── MongoDB Connect & Start ────────────────────────────
const PORT     = process.env.PORT     || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/healthsync';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`✅ MongoDB connected: ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`🚀 HealthSync API running on http://localhost:${PORT}`);
      console.log(`   GET /api/health`);
      console.log(`   GET /api/patients`);
      console.log(`   GET /api/records`);
      console.log(`   GET /api/messages`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
