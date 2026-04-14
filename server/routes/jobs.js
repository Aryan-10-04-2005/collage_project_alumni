import express from 'express';
import Job from '../models/Job.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'Active' })
      .populate('postedBy', 'name company')
      .sort({ createdAt: -1 });
    const mapped = jobs.map(j => ({ ...j.toObject(), id: j._id.toString() }));
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const job = new Job({ ...req.body, postedBy: req.user.id });
    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
