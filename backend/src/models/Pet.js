import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  variantId:   { type: String, required: true }, // references EGG_VARIANTS constant
  name:        { type: String, default: '' },
  stage:       { type: String, enum: ['baby','adult'], default: 'baby' },
  hunger:      { type: Number, default: 50, min: 0, max: 100 },
  happiness:   { type: Number, default: 50, min: 0, max: 100 },
  xp:          { type: Number, default: 0 },
  xpToEvolve:  { type: Number, default: 100 },
  houseId:     { type: String, default: null },
  decorationId:{ type: String, default: null },
  createdAt:   { type: Date, default: Date.now },
  evolvedAt:   { type: Date, default: null }
});

export default mongoose.model('Pet', PetSchema);
