import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId:   { type: String, required: true },
  itemType: { type: String, enum: ['food','decoration','house'], required: true },
  quantity: { type: Number, default: 1, min: 0 }
});

InventorySchema.index({ userId: 1, itemId: 1 }, { unique: true });

export default mongoose.model('Inventory', InventorySchema);
