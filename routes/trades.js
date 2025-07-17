const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Trade = require('../models/Trade');

router.post('/',
  [
    body('symbol').notEmpty().withMessage('Symbol is required'),
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('tradeDate').isISO8601().toDate().withMessage('Trade date must be a valid date')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const trade = new Trade(req.body);
      await trade.save();
      res.status(201).json(trade);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.get('/', async (req, res) => {
  const trades = await Trade.find();
  res.json(trades);
});

module.exports = router;
