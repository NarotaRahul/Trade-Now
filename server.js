const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tradenow', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema = new mongoose.Schema({
  status: String,
  name: String,
  type: String,
  account: String,
  equity: Number,
  traders: Number,
});

const Connection = mongoose.model('Connection', schema);

app.post('/api/connections', async (req, res) => {
  try {
    const conn = new Connection(req.body);
    await conn.save();
    res.status(201).json(conn);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/connections', async (req, res) => {
  const connections = await Connection.find();
  res.json(connections);
});

app.listen(5000, () => console.log('Server running at http://localhost:5000'));
