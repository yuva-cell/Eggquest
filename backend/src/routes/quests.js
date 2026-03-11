import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth.js';
import Quest from '../models/Quest.js';

const router = express.Router();
router.use(auth);

const XP_TABLE   = { trivial:15, easy:30, medium:60, hard:120, legendary:250 };
const GOLD_TABLE = { trivial:5,  easy:10, medium:20, hard:40,  legendary:100 };
const TITLES = ['The Beginner','The Apprentice','The Wanderer','The Fighter','The Brave','The Skilled','The Expert','The Veteran','The Champion','The Legend','The Mythic','The Immortal'];
function xpForLevel(level) { return Math.floor(100 * Math.pow(1.5, level - 1)); }

// Import here to avoid circular deps
import Character from '../models/Character.js';
import { rollEggsForDifficulty, EGG_BY_ID } from '../data/eggVariants.js';

// GET all quests
router.get('/', async (req, res) => {
  const quests = await Quest.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(quests);
});

// POST create quest
router.post('/', async (req, res) => {
  const { title, description, zone, difficulty, dueDate } = req.body;
  const xpReward   = XP_TABLE[difficulty]  || 60;
  const goldReward = GOLD_TABLE[difficulty] || 20;
  const quest = await Quest.create({ userId: req.userId, title, description, zone, difficulty, xpReward, goldReward, dueDate });
  res.json(quest);
});

// PUT complete quest → awards XP, gold, and possibly eggs
router.put('/:id/complete', async (req, res) => {
  const quest = await Quest.findOne({ _id: req.params.id, userId: req.userId });
  if (!quest || quest.status !== 'active')
    return res.status(400).json({ error: 'Quest not completable' });

  quest.status = 'completed';
  quest.completedAt = new Date();
  await quest.save();

  let char = await Character.findOne({ userId: req.userId });
  if (!char) char = await Character.create({ userId: req.userId });

  char.xp   += quest.xpReward;
  char.gold += quest.goldReward;
  char.totalCompleted += 1;

  let leveledUp = false;
  while (char.xp >= char.xpToNext) {
    char.xp     -= char.xpToNext;
    char.level  += 1;
    char.xpToNext = xpForLevel(char.level);
    char.maxHp  = 100 + (char.level - 1) * 10;
    char.hp     = char.maxHp;
    char.strength     = 5 + Math.floor(char.level * 1.2);
    char.intelligence = 5 + Math.floor(char.level * 1.1);
    char.agility      = 5 + Math.floor(char.level * 0.9);
    char.charisma     = 5 + Math.floor(char.level * 0.8);
    char.title = TITLES[Math.min(char.level - 1, TITLES.length - 1)];
    leveledUp = true;
  }

  // Roll for eggs
  const eggVariantIds = rollEggsForDifficulty(quest.difficulty);
  const eggsAwarded = [];
  for (const variantId of eggVariantIds) {
    char.eggInventory.push({ variantId });
    eggsAwarded.push(EGG_BY_ID[variantId]);
  }

  await char.save();
  res.json({ quest, character: char, leveledUp, eggsAwarded });
});

// PUT fail quest
router.put('/:id/fail', async (req, res) => {
  const quest = await Quest.findOne({ _id: req.params.id, userId: req.userId });
  if (!quest) return res.status(404).json({ error: 'Quest not found' });
  quest.status = 'failed';
  await quest.save();

  let char = await Character.findOne({ userId: req.userId });
  if (char) {
    char.hp = Math.max(1, char.hp - 10);
    char.totalFailed += 1;
    await char.save();
  }
  res.json({ quest, character: char });
});

// DELETE quest
router.delete('/:id', async (req, res) => {
  await Quest.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ success: true });
});

export default router;
