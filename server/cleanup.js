import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import User from './models/User.js';
import Job from './models/Job.js';
import Event from './models/Event.js';
import DonationCause from './models/DonationCause.js';
import Student from './models/Student.js';

dotenv.config();

const cleanupData = async () => {
  try {
    await connectDB();

    console.log('🧹 Starting Database Cleanup...');

    // Clear all existing data
    const results = await Promise.all([
      User.deleteMany({}),
      Job.deleteMany({}),
      Event.deleteMany({}),
      DonationCause.deleteMany({}),
      Student.deleteMany({})
    ]);

    console.log('✅ Collections Cleared:');
    console.log(`   - Users    : ${results[0].deletedCount}`);
    console.log(`   - Jobs     : ${results[1].deletedCount}`);
    console.log(`   - Events   : ${results[2].deletedCount}`);
    console.log(`   - Causes   : ${results[3].deletedCount}`);
    console.log(`   - Students : ${results[4].deletedCount}`);
    
    console.log('────────────────────────────────────');
    console.log('🎉 Database Cleanup Complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Cleanup Error:', err);
    process.exit(1);
  }
};

cleanupData();
