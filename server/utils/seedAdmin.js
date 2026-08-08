const User = require('../models/User');

const seedAdminAccount = async () => {
  try {
    // 1. Seed Admin Account
    const adminExists = await User.findOne({ email: 'admin@careerforge.com' });
    if (!adminExists) {
      await User.create({
        name: 'System Admin',
        email: 'admin@careerforge.com',
        password: 'AdminPassword123!',
        role: 'admin',
        phone: '+1 (555) 019-2831',
        location: 'San Francisco, CA',
        isVerified: true,
      });
      console.log(`[Demo Seed] Admin account initialized: admin@careerforge.com`);
    }

    // 2. Seed Recruiter Account
    const recruiterExists = await User.findOne({ email: 'recruiter@careerforge.com' });
    if (!recruiterExists) {
      await User.create({
        name: 'Global Recruiter',
        email: 'recruiter@careerforge.com',
        password: 'Recruiter123!',
        role: 'recruiter',
        phone: '+91 9876543210',
        location: 'Bengaluru, India',
        isVerified: true,
      });
      console.log(`[Demo Seed] Recruiter account initialized: recruiter@careerforge.com`);
    }

    // 3. Seed Job Seeker Account
    const seekerExists = await User.findOne({ email: 'seeker@careerforge.com' });
    if (!seekerExists) {
      await User.create({
        name: 'Chhavi Kumari',
        email: 'seeker@careerforge.com',
        password: 'Seeker123!',
        role: 'jobseeker',
        phone: '+91 6204022479',
        location: 'Kharar, India',
        isVerified: true,
      });
      console.log(`[Demo Seed] Job Seeker account initialized: seeker@careerforge.com`);
    }
  } catch (error) {
    console.error(`[Demo Seed Error] ${error.message}`);
  }
};

module.exports = seedAdminAccount;
