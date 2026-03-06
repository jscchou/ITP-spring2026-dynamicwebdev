const express = require('express');
const Datastore = require('@seald-io/nedb');

const app = express();

const db = new Datastore({ filename: './data/poems.db', autoload: true });

app.use(express.json());
app.use(express.static('client'));

app.get('/', (req, res) => {
  res.send('server is running');
});


// ROUTE: Save a poem to NeDB
app.post('/save', (req, res) => {
  const { title, note, poem } = req.body;

  if (!poem) {
    return res.status(400).json({ error: 'No poem provided' });
  }

  const record = {
    title: title || 'Untitled',
    note:  note  || '',
    poem,
    createdAt: new Date()
  };

  db.insert(record, (err, newDoc) => {
    if (err) return res.status(500).json({ error: 'Failed to save poem' });
    res.json({ success: true, saved: newDoc });
  });
});


// ROUTE: Load all saved poems
app.get('/all-poems', (req, res) => {
  db.find({}).sort({ createdAt: -1 }).exec((err, docs) => {
    if (err) return res.status(500).json({ error: 'Failed to load poems' });
    res.json({ poems: docs });
  });
});

app.listen(5500, () => {
  console.log('server is running!');
});