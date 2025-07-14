const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tradenow', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Import existing routes
app.use('/api/users', require('./routes/users'));
app.use('/api/trades', require('./routes/trades'));
app.use('/api/funds', require('./routes/funds'));
app.use('/api/messages', require('./routes/messages'));

// 💡 NEW: Connections route (define it below or in a separate file)
const connectionSchema = new mongoose.Schema({
  status: String,
  name: String,
  type: String,
  account: String,
  equity: Number,
  traders: Number,
});
const Connection = mongoose.model('Connection', connectionSchema);

// POST route for /api/connections
app.post('/api/connections', async (req, res) => {
  try {
    const newConnection = new Connection(req.body);
    await newConnection.save();
    res.status(201).json(newConnection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save connection' });
  }
});

// Optional GET route
app.get('/api/connections', async (req, res) => {
  try {
    const connections = await Connection.find();
    res.json(connections);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch connections' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
