import mongoose from 'mongoose';

const QuestSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true },
  description: String,
  zone:        { type: String, enum: ['work','personal','health','learning','social'], default: 'personal' },
  difficulty:  { type: String, enum: ['trivial','easy','medium','hard','legendary'], default: 'medium' },
  xpReward:    { type: Number, default: 60 },
  goldReward:  { type: Number, default: 20 },
  status:      { type: String, enum: ['active','completed','failed'], default: 'active' },
  dueDate:     Date,
  completedAt: Date,
  createdAt:   { type: Date, default: Date.now }
});

export default mongoose.model('Quest', QuestSchema);
