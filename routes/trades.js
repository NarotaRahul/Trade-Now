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