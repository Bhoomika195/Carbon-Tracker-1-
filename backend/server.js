const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load .env
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const fs = require('fs');
const logFile = path.join(__dirname, 'server_internal.log');

function logToFile(msg) {
  const line = `${new Date().toISOString()} - ${msg}\n`;
  fs.appendFileSync(logFile, line);
  console.log(msg);
}

// Request Logger
app.use((req, res, next) => {
  logToFile(`${req.method} ${req.url}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    logToFile(`Body: ${JSON.stringify(req.body, null, 2)}`);
  }
  next();
});

// ✅ IMPORT ENTRY MODEL (IMPORTANT)
const Entry = require('./models/Entry');

// ✅ MongoDB Connection (CLEAN & SAFE)
const uri = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '';
const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
logToFile(`Using URI: ${maskedUri}`);
logToFile(`URI Start: "${uri.substring(0, 10)}..."`);
logToFile(`URI End: "...${uri.substring(uri.length - 10)}"`);
logToFile(`URI Length: ${uri.length}`);

logToFile('Attempting to connect to MongoDB Atlas...');
mongoose.connect(uri)
  .then(() => logToFile('✅ MongoDB connected successfully'))
  .catch(err => {
    logToFile(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1);
  });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/entries', require('./routes/entriesRoutes'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.get('/', (req, res) => {
  res.send('Carbon Tracker API is running');
});

// ✅ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  logToFile(`GLOBAL ERROR: ${err.stack}`);
  res.status(500).json({ msg: 'Something went wrong on the server', error: err.message });
});

app.listen(PORT, () => {
  logToFile(`🚀 Server running on http://localhost:${PORT}`);
});
