import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, default: '' },
  location: { type: String, default: '' },
  capacity: { type: Number, default: 100 },
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  desc: { type: String, default: '' },
  tags: [{ type: String }]
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
