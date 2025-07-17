const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Fund = require('../models/Fund');

router.post('/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
    body('currency').notEmpty().withMessage('Currency is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const fund = new Fund(req.body);
      await fund.save();
      res.status(201).json(fund);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.get('/', async (req, res) => {
  const funds = await Fund.find();
  res.json(funds);
});

module.exports = router;
