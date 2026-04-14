import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Alumni' },
  company: { type: String, default: '' },
  dept: { type: String, default: '' },
  year: { type: Number },
  location: { type: String, default: '' },
  industry: { type: String, default: '' },
  skills: [{ type: String }],
  color: { type: String, default: 'navy' },
  bio: { type: String, default: '' },
  about: { type: String, default: '' },
  story: { type: String, default: '' },
  isApproved: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
