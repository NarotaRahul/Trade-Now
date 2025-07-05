const mongoose = require('mongoose');
const fundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['deposit', 'withdrawal'] },
  amount: Number,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Fund', fundSchema);