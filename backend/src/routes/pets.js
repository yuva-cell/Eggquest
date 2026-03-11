import express from 'express';
import auth from '../middleware/auth.js';
import Pet from '../models/Pet.js';
import Inventory from '../models/Inventory.js';
import { EGG_BY_ID } from '../data/eggVariants.js';
import { SHOP_BY_ID } from '../data/shopItems.js';

const router = express.Router();
router.use(auth);

// GET all pets for user
router.get('/', async (req, res) => {
  const pets = await Pet.find({ userId: req.userId }).sort({ createdAt: -1 });
  const enriched = pets.map(p => ({
    ...p.toObject(),
    variant: EGG_BY_ID[p.variantId] || null
  }));
  res.json(enriched);
});

// POST feed a pet (uses 1 food item from inventory)
router.post('/:id/feed', async (req, res) => {
  const { foodItemId } = req.body;
  if (!foodItemId) return res.status(400).json({ error: 'foodItemId required' });

  const item = SHOP_BY_ID[foodItemId];
  if (!item || item.type !== 'food') return res.status(400).json({ error: 'Not a food item' });

  // Check inventory
  const invEntry = await Inventory.findOne({ userId: req.userId, itemId: foodItemId });
  if (!invEntry || invEntry.quantity < 1)
    return res.status(400).json({ error: 'You don\'t have that food item' });

  const pet = await Pet.findOne({ _id: req.params.id, userId: req.userId });
  if (!pet) return res.status(404).json({ error: 'Pet not found' });
  if (pet.stage === 'adult') return res.status(400).json({ error: 'Pet is already fully grown!' });

  // Use item
  invEntry.quantity -= 1;
  if (invEntry.quantity === 0) await invEntry.deleteOne();
  else await invEntry.save();

  // Apply food effects
  pet.hunger    = Math.min(100, pet.hunger + (item.hungerBoost || 0));
  pet.happiness = Math.min(100, pet.happiness + (item.happinessBoost || 0));
  pet.xp += Math.floor(((item.hungerBoost || 0) + (item.happinessBoost || 0)) / 2);

  let evolved = false;
  if (pet.xp >= pet.xpToEvolve && pet.stage === 'baby') {
    pet.stage = 'adult';
    pet.evolvedAt = new Date();
    evolved = true;
  }
  await pet.save();

  const variant = EGG_BY_ID[pet.variantId];
  res.json({ pet: { ...pet.toObject(), variant }, evolved, item });
});

// PUT assign house to pet
router.put('/:id/house', async (req, res) => {
  const { houseId } = req.body;
  const item = SHOP_BY_ID[houseId];
  if (!item || item.type !== 'house') return res.status(400).json({ error: 'Not a house item' });

  const inv = await Inventory.findOne({ userId: req.userId, itemId: houseId });
  if (!inv || inv.quantity < 1) return res.status(400).json({ error: 'You don\'t own this house' });

  const pet = await Pet.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { houseId },
    { new: true }
  );
  if (!pet) return res.status(404).json({ error: 'Pet not found' });
  res.json({ pet: { ...pet.toObject(), variant: EGG_BY_ID[pet.variantId] } });
});

// PUT assign decoration to pet
router.put('/:id/decoration', async (req, res) => {
  const { decorationId } = req.body;
  const item = SHOP_BY_ID[decorationId];
  if (!item || item.type !== 'decoration') return res.status(400).json({ error: 'Not a decoration item' });

  const inv = await Inventory.findOne({ userId: req.userId, itemId: decorationId });
  if (!inv || inv.quantity < 1) return res.status(400).json({ error: 'You don\'t own this decoration' });

  const pet = await Pet.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { decorationId },
    { new: true }
  );
  if (!pet) return res.status(404).json({ error: 'Pet not found' });
  res.json({ pet: { ...pet.toObject(), variant: EGG_BY_ID[pet.variantId] } });
});

// PUT rename pet
router.put('/:id/rename', async (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ error: 'Name required' });
  const pet = await Pet.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { name: name.trim() },
    { new: true }
  );
  if (!pet) return res.status(404).json({ error: 'Pet not found' });
  res.json({ pet: { ...pet.toObject(), variant: EGG_BY_ID[pet.variantId] } });
});

export default router;
