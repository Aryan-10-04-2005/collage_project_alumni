import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// Utility to avoid regex injection on dynamic rolls
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// POST /api/students/seed - Seed demo data manually via CLI
router.post('/seed', async (req, res) => {
  res.status(403).json({ message: 'Seeding is now managed via CLI. Run "npm run seed" in the server directory.' });
});

// GET /api/students/:roll - Lookup student by GEC Roll Number
router.get('/:roll', async (req, res) => {
  try {
    const normalizedRoll = String(req.params.roll || '').trim();
    if (!normalizedRoll) {
      return res.status(400).json({ message: 'Roll number is required' });
    }

    const student = await Student.findOne({
      rollNumber: { $regex: `^${escapeRegExp(normalizedRoll)}$`, $options: 'i' }
    });

    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found in college database.' });
    }
  } catch (err) {
    console.error('Error finding student:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET /api/students/all - Fetch all students for Admin Directory
router.get('/', async (req, res) => {
  try {
    const students = await Student.find({}, null, { sort: { rollNumber: 1 } });
    const mapped = students.map(s => ({ ...s.toObject(), id: s._id.toString() }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
