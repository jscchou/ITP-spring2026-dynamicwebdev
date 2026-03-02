const express = require('express');
const { spawn } = require('child_process');  // built-in Node module
const Datastore = require('@seald-io/nedb');
const path = require('path');

const app = express();
const PORT = 3000;

// --- NeDB setup ---
const db = new Datastore({ filename: './data.db', autoload: true });

// --- Middleware ---
app.use(express.json());
app.use(express.static('client')); // serves your HTML/JS frontend

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ---------------------------------------------------
// ROUTE: Compose a poem
// Browser hits this → Node spawns Python → gets poem back
// ---------------------------------------------------
app.post('/compose', (req, res) => {

  // Spawn your Python script as a subprocess
  const python = spawn('python3', ['poetry-machines/machine1.py']);

  // You can optionally pass input data to the script via stdin:
  // python.stdin.write(JSON.stringify({ prompt: req.body.prompt }));
  // python.stdin.end();

  let output = '';
  let errorOutput = '';

  // Collect data from Python's stdout
  python.stdout.on('data', (data) => {
    output += data.toString();
  });

  // Collect any errors from Python's stderr
  python.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  // When the Python script finishes (exits)
  python.on('close', (exitCode) => {
    if (exitCode !== 0) {
      console.error('Python error:', errorOutput);
      return res.status(500).json({ error: 'Poetry machine failed', detail: errorOutput });
    }

    try {
      const poem = JSON.parse(output); // Python must print valid JSON
      res.json({ poem });
    } catch (e) {
      res.status(500).json({ error: 'Could not parse Python output', raw: output });
    }
  });
});

// ---------------------------------------------------
// ROUTE: Save a poem to NeDB
// ---------------------------------------------------
app.post('/save', (req, res) => {
  const { poem } = req.body;

  if (!poem) {
    return res.status(400).json({ error: 'No poem provided' });
  }

  const record = {
    poem,
    createdAt: new Date()
  };

  db.insert(record, (err, newDoc) => {
    if (err) return res.status(500).json({ error: 'Failed to save poem' });
    res.json({ success: true, saved: newDoc });
  });
});

// ---------------------------------------------------
// ROUTE: Load all saved poems
// ---------------------------------------------------
app.get('/data', (req, res) => {
  db.find({}).sort({ createdAt: -1 }).exec((err, docs) => {
    if (err) return res.status(500).json({ error: 'Failed to load poems' });
    res.json({ poems: docs });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});