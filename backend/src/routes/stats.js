import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth.js';
import Quest from '../models/Quest.js';

const router = express.Router();
router.use(auth);

router.get('/', async (req, res) => {
  const total     = await Quest.countDocuments({ userId: req.userId });
  const completed = await Quest.countDocuments({ userId: req.userId, status: 'completed' });
  const active    = await Quest.countDocuments({ userId: req.userId, status: 'active' });
  const byZone    = await Quest.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
    { $group: {
      _id: '$zone',
      count:     { $sum: 1 },
      completed: { $sum: { $cond: [{ $eq: ['$status','completed'] }, 1, 0] } }
    }}
  ]);
  res.json({ total, completed, active, byZone });
});

export default router;
