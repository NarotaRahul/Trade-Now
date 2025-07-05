// 📁 server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tradenow', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/trades', require('./routes/trades'));
app.use('/api/funds', require('./routes/funds'));
app.use('/api/messages', require('./routes/messages'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// 📁 models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', userSchema);

// 📁 models/Trade.js
const tradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  symbol: String,
  quantity: Number,
  buyPrice: Number,
  sellPrice: Number,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Trade', tradeSchema);

// 📁 models/Fund.js
const fundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['deposit', 'withdrawal'] },
  amount: Number,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Fund', fundSchema);

// 📁 models/Message.js
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Message', messageSchema);

// 📁 routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;

// 📁 routes/trades.js
const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');

router.post('/', async (req, res) => {
  try {
    const trade = new Trade(req.body);
    await trade.save();
    res.status(201).json(trade);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const trades = await Trade.find();
  res.json(trades);
});

module.exports = router;

// 📁 routes/funds.js
const express = require('express');
const router = express.Router();
const Fund = require('../models/Fund');

router.post('/', async (req, res) => {
  try {
    const fund = new Fund(req.body);
    await fund.save();
    res.status(201).json(fund);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const funds = await Fund.find();
  res.json(funds);
});

module.exports = router;

// 📁 routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  try {
    const msg = new Message(req.body);
    await msg.save();
    res.status(201).json(msg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

module.exports = router;
