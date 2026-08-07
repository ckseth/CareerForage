const Resume = require('../models/Resume');

// Helper to calculate ATS Score out of 100 & actionable suggestions
const computeATSScoreAndSuggestions = (resume) => {
  let score = 0;
  const suggestions = [];

  const pd = resume.personalDetails || {};
  const edu = resume.education || [];
  const exp = resume.experience || [];
  const skills = resume.skills || { technical: [], soft: [] };
  const projects = resume.projects || [];
  const certs = resume.certifications || [];
  const achs = resume.achievements || [];

  // 1. Personal Contact Info (15 Points)
  if (pd.name && pd.name.trim() !== '') score += 4;
  else suggestions.push('Add your full name to the personal details header.');

  if (pd.email && pd.email.includes('@')) score += 4;
  else suggestions.push('Add a valid professional email address.');

  if (pd.phone && pd.phone.trim() !== '') score += 3;
  else suggestions.push('Include a contact phone number.');

  if (pd.linkedin || pd.github) score += 4;
  else suggestions.push('Include LinkedIn and GitHub profile links for recruiter verification.');

  // 2. Technical & Soft Skills (20 Points)
  const techCount = (skills.technical || []).length;
  const softCount = (skills.soft || []).length;

  if (techCount >= 4) score += 12;
  else if (techCount >= 1) score += 6;
  else suggestions.push('Add at least 4 relevant technical skills (e.g., React.js, Node.js, Express, MongoDB).');

  if (softCount >= 2) score += 8;
  else if (softCount >= 1) score += 4;
  else suggestions.push('Add soft skills (e.g., Problem Solving, Team Collaboration, Communication).');

  // 3. Education (15 Points)
  if (edu.length > 0 && edu[0].degree && edu[0].college) {
    score += 15;
  } else {
    suggestions.push('Add your degree and college/university details in the Education section.');
  }

  // 4. Work Experience (20 Points)
  if (exp.length > 0 && exp[0].company && exp[0].role) {
    score += 12;
    if (exp[0].description && exp[0].description.length > 30) {
      score += 8;
    } else {
      suggestions.push('Expand your work experience description with action verbs and measurable results.');
    }
  } else {
    suggestions.push('Add work experience or internship details to improve ATS scoring.');
  }

  // 5. Projects (15 Points)
  if (projects.length > 0 && projects[0].name && projects[0].description) {
    score += 10;
    if (projects[0].link) {
      score += 5;
    } else {
      suggestions.push('Add live demo or GitHub links for your projects.');
    }
  } else {
    suggestions.push('Add at least 1 key software project with technologies used.');
  }

  // 6. Certifications & Achievements (15 Points)
  if (certs.length > 0 || achs.length > 0) {
    score += 15;
  } else {
    suggestions.push('Add certifications or key achievements to stand out to recruiters.');
  }

  // Cap score between 30 and 100
  const finalScore = Math.min(100, Math.max(35, score));

  return {
    atsScore: finalScore,
    suggestions,
    breakdown: {
      contactInfo: pd.name && pd.email ? 15 : 7,
      skills: techCount >= 4 ? 20 : 10,
      education: edu.length > 0 ? 15 : 0,
      experience: exp.length > 0 ? 20 : 5,
      projects: projects.length > 0 ? 15 : 5,
      structure: certs.length > 0 || achs.length > 0 ? 15 : 8,
    },
  };
};

// @desc    Analyze resume ATS score & get suggestions
// @route   POST /api/resumes/analyze
// @access  Public / Private
const analyzeResume = async (req, res, next) => {
  try {
    const resumeData = req.body;
    const analysis = computeATSScoreAndSuggestions(resumeData);

    res.status(200).json({
      success: true,
      ...analysis,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's saved resumes
// @route   GET /api/resumes/my
// @access  Private
const getMyResumes = async (req, res, next) => {
  try {
    let resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });

    // If no resume exists, seed default populated resume for the candidate
    if (resumes.length === 0) {
      const defaultResume = await Resume.create({
        user: req.user._id,
        title: `${req.user.name}'s ATS Resume`,
        template: 'modern',
        personalDetails: {
          name: req.user.name || 'Alex Morgan',
          email: req.user.email || 'alex@example.com',
          phone: req.user.phone || '+1 (555) 019-2831',
          address: req.user.location || 'San Francisco, CA',
          linkedin: 'https://linkedin.com/in/alexmorgan',
          github: 'https://github.com/alexmorgan',
        },
        education: [
          {
            degree: 'B.S. in Computer Science',
            college: 'State University of Technology',
            year: '2020 - 2024',
            cgpa: '3.8 / 4.0',
          },
        ],
        experience: [
          {
            company: 'TechCorp Solutions',
            role: 'Software Engineering Intern',
            startDate: 'Jun 2023',
            endDate: 'Present',
            description: 'Architected responsive React.js UI components and optimized Express.js REST API endpoints, improving server throughput by 35%.',
          },
        ],
        skills: {
          technical: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript (ES6+)', 'Tailwind CSS', 'Git', 'REST APIs'],
          soft: ['Problem Solving', 'Team Leadership', 'Agile/Scrum', 'Communication'],
        },
        projects: [
          {
            name: 'CareerForge Portal',
            description: 'Full-stack MERN job portal and ATS resume builder application with real-time scoring.',
            technologies: 'React, Express, Node.js, MongoDB, Tailwind CSS',
            link: 'https://github.com/alexmorgan/careerforge',
          },
        ],
        certifications: [
          { title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
        ],
        achievements: [
          '1st Place Winner at National Collegiate Hackathon 2023 out of 150+ teams.',
        ],
        atsScore: 92,
      });

      resumes = [defaultResume];
    }

    res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update full resume document
// @route   POST /api/resumes
// @access  Private
const createOrUpdateResume = async (req, res, next) => {
  try {
    const { _id, title, template, personalDetails, education, experience, skills, projects, certifications, achievements } = req.body;

    const analysis = computeATSScoreAndSuggestions(req.body);

    let resume;
    if (_id) {
      resume = await Resume.findByIdAndUpdate(
        _id,
        {
          title: title || `${personalDetails?.name || 'Candidate'}'s ATS Resume`,
          template: template || 'modern',
          personalDetails,
          education,
          experience,
          skills,
          projects,
          certifications,
          achievements,
          atsScore: analysis.atsScore,
        },
        { new: true, runValidators: true }
      );
    }

    if (!resume) {
      resume = await Resume.create({
        user: req.user._id,
        title: title || `${personalDetails?.name || 'Candidate'}'s ATS Resume`,
        template: template || 'modern',
        personalDetails,
        education,
        experience,
        skills,
        projects,
        certifications,
        achievements,
        atsScore: analysis.atsScore,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resume saved successfully!',
      resume,
      analysis,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyResumes,
  createOrUpdateResume,
  analyzeResume,
};
