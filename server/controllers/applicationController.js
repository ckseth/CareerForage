const Application = require('../models/Application');
const Job = require('../models/Job');
const Resume = require('../models/Resume');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Job Seeker)
const applyForJob = async (req, res, next) => {
  try {
    const { jobId, resumeId, coverNote } = req.body;

    if (!jobId) {
      return res.status(400).json({ success: false, message: 'Please provide a jobId' });
    }

    // Verify job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job opening not found' });
    }

    // Check duplicate application
    const existingApp = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (existingApp) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted an application for this position',
      });
    }

    // Attach resume snapshot
    let resumeRef = resumeId;
    let snapshot = {
      title: `${req.user.name}'s Profile Resume`,
      skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      atsScore: 92,
    };

    if (resumeId) {
      const foundResume = await Resume.findById(resumeId);
      if (foundResume) {
        snapshot = {
          title: foundResume.title,
          skills: foundResume.skills,
          atsScore: foundResume.atsScore,
        };
      }
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resume: resumeRef || undefined,
      resumeSnapshot: snapshot,
      coverNote: coverNote || '',
      status: 'Applied',
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's submitted applications
// @route   GET /api/applications/my
// @access  Private (Job Seeker)
const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title company location salary jobType companyLogo skills experience')
      .populate('resume', 'title atsScore')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get applications for a specific job (Recruiter/Admin)
// @route   GET /api/applications/job/:jobId
// @access  Private (Recruiter / Admin)
const getJobApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email phone location profileImage')
      .populate('resume')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Recruiter / Admin)
const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Applied', 'Under Review', 'Shortlisted', 'Rejected', 'Selected'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${allowedStatuses.join(', ')}`,
      });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({
      success: true,
      message: `Application status updated to '${status}'`,
      application,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
};
