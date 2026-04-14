import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  type: { type: String, default: 'Full-time' },
  field: { type: String, default: 'Technology' },
  location: { type: String, default: '' },
  salary: { type: String, default: '' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  desc: { type: String, default: '' },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
