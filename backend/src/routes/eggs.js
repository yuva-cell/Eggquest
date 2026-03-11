import express from 'express';
import auth from '../middleware/auth.js';
import Character from '../models/Character.js';
import Pet from '../models/Pet.js';
import { EGG_BY_ID } from '../data/eggVariants.js';

const router = express.Router();
router.use(auth);

// GET all eggs in inventory
router.get('/', async (req, res) => {
  const char = await Character.findOne({ userId: req.userId });
  if (!char) return res.json([]);

  const eggs = (char.eggInventory || []).map(e => ({
    _id: e._id,
    variantId: e.variantId,
    obtainedAt: e.obtainedAt,
    variant: EGG_BY_ID[e.variantId] || null
  }));
  res.json(eggs);
});

// POST hatch an egg (by egg inventory _id)
router.post('/hatch/:eggId', async (req, res) => {
  const char = await Character.findOne({ userId: req.userId });
  if (!char) return res.status(404).json({ error: 'Character not found' });

  const eggIdx = char.eggInventory.findIndex(e => e._id.toString() === req.params.eggId);
  if (eggIdx === -1) return res.status(404).json({ error: 'Egg not found in inventory' });

  const egg = char.eggInventory[eggIdx];
  const variant = EGG_BY_ID[egg.variantId];
  if (!variant) return res.status(400).json({ error: 'Unknown egg variant' });

  // Remove egg from inventory
  char.eggInventory.splice(eggIdx, 1);
  await char.save();

  // Create pet
  const pet = await Pet.create({
    userId: req.userId,
    variantId: variant.id,
    name: variant.adultName,
    stage: 'baby',
    xpToEvolve: 100
  });

  res.json({ pet, variant });
});

export default router;
