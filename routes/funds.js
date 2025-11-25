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