import mongoose from 'mongoose';

const DonationCauseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  raised: { type: Number, default: 0 },
  goal: { type: Number, required: true },
  icon: { type: String, default: '🎗' },
  donors: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.DonationCause || mongoose.model('DonationCause', DonationCauseSchema);
