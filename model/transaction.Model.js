import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  transactionDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
  paymentMethod: String
});

export default mongoose.model('Transaction', transactionSchema);
