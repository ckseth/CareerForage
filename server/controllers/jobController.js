const Job = require('../models/Job');

// @desc    Get all jobs with search and filter
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res, next) => {
  try {
    const { keyword, jobType, location, experience } = req.query;

    let query = { isActive: true };

    // Search keyword filter (title, company, description, skills)
    if (keyword && keyword.trim() !== '') {
      const searchRegex = new RegExp(keyword.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { company: searchRegex },
        { description: searchRegex },
        { skills: searchRegex },
      ];
    }

    // Job type filter (Full-time, Part-time, Remote, Contract, Internship)
    if (jobType && jobType !== 'All') {
      query.jobType = jobType;
    }

    // Location filter
    if (location && location.trim() !== '') {
      query.location = new RegExp(location.trim(), 'i');
    }

    // Experience level filter
    if (experience && experience !== 'All') {
      query.experience = new RegExp(experience.trim(), 'i');
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job details
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email company');
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job opening not found',
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new job posting
// @route   POST /api/jobs
// @access  Private (Recruiter / Admin)
const createJob = async (req, res, next) => {
  try {
    const { title, company, location, salary, jobType, description, requirements, skills, experience } = req.body;

    if (!title || !company || !location || !salary || !description || !skills) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required job details',
      });
    }

    const formattedSkills = Array.isArray(skills)
      ? skills
      : skills.split(',').map((s) => s.trim());

    const formattedRequirements = Array.isArray(requirements)
      ? requirements
      : requirements ? requirements.split('\n').map((r) => r.trim()).filter(Boolean) : [];

    const companyLogo = company.charAt(0).toUpperCase();

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      jobType: jobType || 'Full-time',
      description,
      requirements: formattedRequirements,
      skills: formattedSkills,
      experience: experience || '2-4 years',
      companyLogo,
      postedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Job opening posted successfully',
      job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update job posting
// @route   PUT /api/jobs/:id
// @access  Private (Recruiter / Admin)
const updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check ownership unless admin
    if (job.postedBy && job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this job' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job posting
// @route   DELETE /api/jobs/:id
// @access  Private (Recruiter / Admin)
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.postedBy && job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Job opening removed',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
