import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import characterRoutes from './routes/character.js';
import questRoutes from './routes/quests.js';
import eggRoutes from './routes/eggs.js';
import petRoutes from './routes/pets.js';
import shopRoutes from './routes/shop.js';
import statsRoutes from './routes/stats.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/character', characterRoutes);
app.use('/api/quests',    questRoutes);
app.use('/api/eggs',      eggRoutes);
app.use('/api/pets',      petRoutes);
app.use('/api/shop',      shopRoutes);
app.use('/api/stats',     statsRoutes);

// ── MongoDB ───────────────────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('⚔️  MongoDB connected – QuestHub Online'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🏰 QuestHub Backend → http://localhost:${PORT}`));
