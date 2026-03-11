import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name:         { type: String, default: 'Hero' },
  classIcon:    { type: String, default: '🧙' },
  level:        { type: Number, default: 1 },
  xp:           { type: Number, default: 0 },
  xpToNext:     { type: Number, default: 100 },
  gold:         { type: Number, default: 50 },
  hp:           { type: Number, default: 100 },
  maxHp:        { type: Number, default: 100 },
  strength:     { type: Number, default: 5 },
  intelligence: { type: Number, default: 5 },
  agility:      { type: Number, default: 5 },
  charisma:     { type: Number, default: 5 },
  totalCompleted: { type: Number, default: 0 },
  totalFailed:    { type: Number, default: 0 },
  title:        { type: String, default: 'The Beginner' },
  // Eggs waiting to be hatched
  eggInventory: [{
    variantId: String,
    obtainedAt: { type: Date, default: Date.now }
  }]
});

export default mongoose.model('Character', CharacterSchema);
