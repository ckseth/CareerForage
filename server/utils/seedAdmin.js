const User = require('../models/User');

const seedAdminAccount = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const admin = await User.create({
        name: 'System Admin',
        email: 'admin@careerforge.com',
        password: 'AdminPassword123!',
        role: 'admin',
        phone: '+1 (555) 019-2831',
        location: 'San Francisco, CA',
        isVerified: true,
      });
      console.log(`[Admin Seed] Admin account initialized successfully: ${admin.email}`);
    } else {
      console.log(`[Admin Seed] Admin account already exists: ${adminExists.email}`);
    }
  } catch (error) {
    console.error(`[Admin Seed Error] ${error.message}`);
  }
};

module.exports = seedAdminAccount;
