import express from 'express';
import Event from '../models/Event.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    const mapped = events.map(e => ({ ...e.toObject(), id: e._id.toString() }));
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    const event = new Event(req.body);
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/register', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (!event.registeredUsers.includes(req.user.id)) {
      event.registeredUsers.push(req.user.id);
      await event.save();
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
