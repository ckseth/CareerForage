const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      default: 'My Professional ATS Resume',
      trim: true,
    },
    template: {
      type: String,
      enum: ['classic', 'modern', 'minimal'],
      default: 'modern',
    },
    personalDetails: {
      name: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      address: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
    },
    education: [
      {
        degree: { type: String, default: '' },
        college: { type: String, default: '' },
        year: { type: String, default: '' },
        cgpa: { type: String, default: '' },
      },
    ],
    experience: [
      {
        company: { type: String, default: '' },
        role: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    ],
    skills: {
      technical: { type: [String], default: [] },
      soft: { type: [String], default: [] },
    },
    projects: [
      {
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        technologies: { type: String, default: '' },
        link: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
      },
    ],
    certifications: [
      {
        title: { type: String, default: '' },
        issuer: { type: String, default: '' },
        year: { type: String, default: '' },
      },
    ],
    achievements: {
      type: [String],
      default: [],
    },
    atsScore: {
      type: Number,
      default: 85,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;
