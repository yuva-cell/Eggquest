import './env.js';   // ← MUST be first: loads .env before any route reads process.env
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import characterRoutes from './routes/character.js';
import questRoutes from './routes/quests.js';
import eggRoutes from './routes/eggs.js';
import petRoutes from './routes/pets.js';
import shopRoutes from './routes/shop.js';
import statsRoutes from './routes/stats.js';

// dotenv was already called in env.js above


// ── Fail fast if critical env vars are missing ───────────────────────────────
const { MONGO_URI, JWT_SECRET, PORT = 5000, NODE_ENV = 'development', FRONTEND_URL } = process.env;

if (!MONGO_URI) {
  console.error('❌  MONGO_URI is not set. Set it in your .env file and restart.');
  process.exit(1);
}
if (!JWT_SECRET || JWT_SECRET === 'questhub_epic_secret_key_change_this_2024') {
  if (NODE_ENV === 'production') {
    console.error('❌  JWT_SECRET is not set or is using the default value. Set a strong secret in production.');
    process.exit(1);
  } else {
    console.warn('⚠️   JWT_SECRET is using the default value. Change it before deploying to production.');
  }
}

// ── App setup ─────────────────────────────────────────────────────────────────
const app = express();

// Security headers
app.use(helmet());

// HTTP logging (concise in production, colorful in dev)
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// Gzip compression
app.use(compression());

// CORS – always include the known prod frontend + common dev ports
const defaultOrigins = [
  'https://eggquest.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
];
const allowedOrigins = FRONTEND_URL
  ? [...new Set([...FRONTEND_URL.split(',').map(o => o.trim()), ...defaultOrigins])]
  : defaultOrigins;

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (NODE_ENV === 'development' || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS: origin '${origin}' not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10kb' }));

// ── Rate limiting on auth routes ──────────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/auth', authLimiter);

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

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// ── MongoDB ───────────────────────────────────────────────────────────────────
mongoose.connect(MONGO_URI)
  .then(() => console.log('⚔️  MongoDB connected – QuestHub Online'))
  .catch(err => { console.error('❌ MongoDB error:', err.message); process.exit(1); });

// ── Start server ──────────────────────────────────────────────────────────────
const server = app.listen(PORT, () =>
  console.log(`🏰 QuestHub Backend → http://localhost:${PORT} [${NODE_ENV}]`));

// ── Graceful shutdown ─────────────────────────────────────────────────────────
const shutdown = (signal) => {
  console.log(`\n${signal} received — shutting down gracefully...`);
  server.close(async () => {
    await mongoose.disconnect();
    console.log('✅ Server and DB connection closed.');
    process.exit(0);
  });
  // Force exit after 10s
  setTimeout(() => process.exit(1), 10_000).unref();
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));
