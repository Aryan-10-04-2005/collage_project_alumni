import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },
  year: { type: String, required: true },
  dept: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
