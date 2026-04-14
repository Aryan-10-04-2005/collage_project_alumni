import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';

import authRoutes from './routes/auth.js';
import alumniRoutes from './routes/alumni.js';
import jobsRoutes from './routes/jobs.js';
import eventsRoutes from './routes/events.js';
import donateRoutes from './routes/donate.js';
import studentsRoutes from './routes/students.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/donate', donateRoutes);
app.use('/api/students', studentsRoutes);

app.get('/', (req, res) => res.send('GEC Alumni API is running'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
