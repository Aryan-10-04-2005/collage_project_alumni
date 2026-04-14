import express from 'express';
import User from '../models/User.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find({ role: 'Alumni' }).select('-password');
    // Map backend schema to frontend expectations
    const mappedUsers = users.map(u => {
      const obj = u.toObject();
      obj.id = obj._id.toString();
      obj.pending = !obj.isApproved;
      return obj;
    });
    res.json(mappedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Route to get pending or all
router.get('/pending', protect, admin, async (req, res) => {
  try {
    const users = await User.find({ isApproved: false }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/approve', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isApproved = req.body.isApproved;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
