const SavedJob = require('../models/SavedJob');
const Job = require('../models/Job');

// @desc    Toggle save/unsave a job
// @route   POST /api/saved-jobs/toggle
// @access  Private (Job Seeker)
const toggleSaveJob = async (req, res, next) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ success: false, message: 'Please provide a jobId' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const existing = await SavedJob.findOne({ user: req.user._id, job: jobId });

    if (existing) {
      await existing.deleteOne();
      return res.status(200).json({
        success: true,
        saved: false,
        message: 'Job removed from saved jobs',
      });
    } else {
      await SavedJob.create({
        user: req.user._id,
        job: jobId,
      });
      return res.status(201).json({
        success: true,
        saved: true,
        message: 'Job saved successfully!',
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all saved jobs for current user
// @route   GET /api/saved-jobs
// @access  Private (Job Seeker)
const getSavedJobs = async (req, res, next) => {
  try {
    const savedJobs = await SavedJob.find({ user: req.user._id })
      .populate('job')
      .sort({ createdAt: -1 });

    const jobs = savedJobs
      .filter((sj) => sj.job !== null)
      .map((sj) => ({
        _id: sj.job._id,
        title: sj.job.title,
        company: sj.job.company,
        location: sj.job.location,
        salary: sj.job.salary,
        jobType: sj.job.jobType,
        companyLogo: sj.job.companyLogo,
        experience: sj.job.experience,
        skills: sj.job.skills,
        savedAt: sj.createdAt,
        savedJobId: sj._id,
      }));

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove a job from saved jobs by jobId
// @route   DELETE /api/saved-jobs/:jobId
// @access  Private (Job Seeker)
const removeSavedJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const result = await SavedJob.findOneAndDelete({
      user: req.user._id,
      job: jobId,
    });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Saved job not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Job removed from saved jobs',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  toggleSaveJob,
  getSavedJobs,
  removeSavedJob,
};
