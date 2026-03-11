import express from 'express';
import auth from '../middleware/auth.js';
import Character from '../models/Character.js';
import Inventory from '../models/Inventory.js';
import { SHOP_ITEMS, SHOP_BY_ID } from '../data/shopItems.js';

const router = express.Router();
router.use(auth);

// GET all shop items + user inventory
router.get('/', async (req, res) => {
  const inventory = await Inventory.find({ userId: req.userId });
  const invMap = Object.fromEntries(inventory.map(i => [i.itemId, i.quantity]));

  const items = SHOP_ITEMS.map(item => ({
    ...item,
    owned: invMap[item.id] || 0
  }));
  res.json(items);
});

// POST buy an item
router.post('/buy', async (req, res) => {
  const { itemId, quantity = 1 } = req.body;
  const item = SHOP_BY_ID[itemId];
  if (!item) return res.status(404).json({ error: 'Item not found' });
  if (quantity < 1) return res.status(400).json({ error: 'Invalid quantity' });

  const totalCost = item.cost * quantity;
  const char = await Character.findOne({ userId: req.userId });
  if (!char) return res.status(404).json({ error: 'Character not found' });
  if (char.gold < totalCost) return res.status(400).json({ error: `Not enough gold! Need ${totalCost}, have ${char.gold}` });

  // Deduct gold
  char.gold -= totalCost;
  await char.save();

  // Add to inventory (upsert)
  await Inventory.findOneAndUpdate(
    { userId: req.userId, itemId },
    { $inc: { quantity }, $set: { itemType: item.type } },
    { upsert: true, new: true }
  );

  res.json({ success: true, goldSpent: totalCost, remainingGold: char.gold, item });
});

// GET user's inventory only
router.get('/inventory', async (req, res) => {
  const inventory = await Inventory.find({ userId: req.userId, quantity: { $gt: 0 } });
  const enriched = inventory.map(i => ({
    ...i.toObject(),
    item: SHOP_BY_ID[i.itemId] || null
  }));
  res.json(enriched);
});

export default router;
