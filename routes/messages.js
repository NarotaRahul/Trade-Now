const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Message = require('../models/Message');

router.post('/',
  [
    body('sender').notEmpty().withMessage('Sender is required'),
    body('recipient').notEmpty().withMessage('Recipient is required'),
    body('content').notEmpty().withMessage('Content is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const msg = new Message(req.body);
      await msg.save();
      res.status(201).json(msg);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.get('/', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

module.exports = router;
