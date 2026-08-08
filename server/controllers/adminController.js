const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get real platform metrics for Admin Dashboard
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getAdminStats = async (req, res, next) => {
  try {
    const [totalUsers, totalSeekers, totalRecruiters, totalJobs, totalApplications] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'jobseeker' }),
      User.countDocuments({ role: 'recruiter' }),
      Job.countDocuments(),
      Application.countDocuments(),
    ]);

    const recentUsers = await User.find().select('-password').sort({ createdAt: -1 }).limit(10);
    const recentJobs = await Job.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalSeekers,
        totalRecruiters,
        totalJobs,
        totalApplications,
      },
      recentUsers,
      recentJobs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminStats,
};
