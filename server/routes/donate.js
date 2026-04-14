import express from 'express';
import DonationCause from '../models/DonationCause.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const causes = await DonationCause.find();
    res.json(causes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id, amount } = req.body;
    let cause = await DonationCause.findOne({ id });

    if (cause) {
      cause.raised += Number(amount);
      cause.donors += 1;
      await cause.save();
    } else {
      cause = new DonationCause({ id, name: id.toUpperCase(), raised: Number(amount), goal: 1000000, donors: 1 });
      await cause.save();
    }
    res.json(cause);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
