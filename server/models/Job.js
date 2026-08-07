const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a job title'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Please add a company name'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Please add a job location'],
      trim: true,
    },
    salary: {
      type: String,
      required: [true, 'Please add a salary range'],
      trim: true,
    },
    jobType: {
      type: String,
      required: [true, 'Please select a job type'],
      enum: ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'],
      default: 'Full-time',
    },
    description: {
      type: String,
      required: [true, 'Please add a job description'],
    },
    requirements: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      required: [true, 'Please add at least one required skill'],
    },
    experience: {
      type: String,
      required: [true, 'Please specify experience level'],
      default: '2-4 years',
    },
    companyLogo: {
      type: String,
      default: '',
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Search index for text queries on title, company, skills, and description
jobSchema.index({ title: 'text', company: 'text', description: 'text', skills: 'text' });

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
