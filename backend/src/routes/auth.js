import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Character from '../models/Character.js';
import Quest from '../models/Quest.js';
import { getStarterMissions } from '../data/missions.js';

const router = express.Router();

const XP_TABLE   = { trivial:15, easy:30, medium:60, hard:120, legendary:250 };
const GOLD_TABLE = { trivial:5,  easy:10, medium:20, hard:40,  legendary:100 };

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });
    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const existingEmail    = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail)    return res.status(400).json({ error: 'Email already registered' });
    if (existingUsername) return res.status(400).json({ error: 'Username already taken' });

    const hashed = await bcrypt.hash(password, 12);
    const user   = await User.create({ username, email, password: hashed });
    await Character.create({ userId: user._id, name: username, gold: 50 });

    // Seed starter missions so the quest board isn't empty on first login
    const starters = getStarterMissions(5);
    const questDocs = starters.map(m => ({
      userId:      user._id,
      title:       m.title,
      description: m.description,
      zone:        m.zone,
      difficulty:  m.difficulty,
      xpReward:    XP_TABLE[m.difficulty]  || 60,
      goldReward:  GOLD_TABLE[m.difficulty] || 20,
    }));
    await Quest.insertMany(questDocs);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, username: user.username, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'No account found with that email' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Incorrect password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, username: user.username, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
