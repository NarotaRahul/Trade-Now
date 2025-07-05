const mongoose = require('mongoose');
const tradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  symbol: String,
  quantity: Number,
  buyPrice: Number,
  sellPrice: Number,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Trade', tradeSchema);