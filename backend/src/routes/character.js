import express from 'express';
import auth from '../middleware/auth.js';
import Character from '../models/Character.js';

const router = express.Router();
router.use(auth);

// GET character
router.get('/', async (req, res) => {
  let char = await Character.findOne({ userId: req.userId });
  if (!char) char = await Character.create({ userId: req.userId, gold: 50 });
  res.json(char);
});

// PUT update character
router.put('/', async (req, res) => {
  const char = await Character.findOneAndUpdate(
    { userId: req.userId },
    { $set: req.body },
    { new: true, upsert: true }
  );
  res.json(char);
});

export default router;
