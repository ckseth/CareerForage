const Job = require('../models/Job');
const User = require('../models/User');
const Application = require('../models/Application');

const sampleJobs = [
  {
    title: 'Senior Frontend Developer (React & Vite)',
    company: 'Vercel Labs',
    location: 'Bengaluru, Karnataka (Hybrid)',
    salary: '₹14,00,000 - ₹18,00,000',
    jobType: 'Full-time',
    description: 'We are seeking an experienced Senior Frontend Developer to lead the development of high-performance web applications using React, Vite, and Tailwind CSS. You will collaborate directly with design and product teams to deliver lightning-fast UI experiences.',
    requirements: [
      '5+ years of experience with React.js and modern JavaScript (ES6+)',
      'Deep understanding of state management, performance tuning, and SSR/Vite build toolchains',
      'Extensive experience with Tailwind CSS and responsive design principles',
    ],
    skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Vite', 'REST APIs'],
    experience: '4-6 years',
    companyLogo: '',
  },
  {
    title: 'Full-Stack MERN Engineer',
    company: 'Stripe Global',
    location: 'Bengaluru, Karnataka (Remote)',
    salary: '₹12,00,000 - ₹16,00,000',
    jobType: 'Full-time',
    description: 'Join Stripe to build robust payment developer tools using the MERN stack. You will architect Express REST endpoints, design MongoDB schemas, and craft intuitive React user interfaces.',
    requirements: [
      '3+ years of full-stack development experience with Node.js and React',
      'Proficiency in designing MongoDB collections and writing efficient Mongoose queries',
      'Experience with JWT authentication, role-based authorization, and security best practices',
    ],
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'REST APIs'],
    experience: '3-5 years',
    companyLogo: '',
  },
  {
    title: 'Lead AI & Machine Learning Engineer',
    company: 'OpenCore AI Systems',
    location: 'Hyderabad, Telangana (Remote)',
    salary: '₹18,00,000 - ₹24,00,000',
    jobType: 'Full-time',
    description: 'OpenCore is looking for a Lead AI Engineer to fine-tune Large Language Models (LLMs) and build intelligent resume parsing and job-matching algorithms.',
    requirements: [
      '4+ years developing machine learning models and NLP applications in Python',
      'Hands-on experience with OpenAI APIs, PyTorch, or HuggingFace transformers',
    ],
    skills: ['Python', 'PyTorch', 'NLP', 'OpenAI API', 'FastAPI', 'Docker'],
    experience: '5+ years',
    companyLogo: '',
  },
  {
    title: 'Backend Node.js Architect',
    company: 'Datadog Tech',
    location: 'Mumbai, Maharashtra (Hybrid)',
    salary: '₹15,00,000 - ₹20,00,000',
    jobType: 'Full-time',
    description: 'Help construct real-time telemetry and API services supporting millions of active developers worldwide using Node.js and Express.',
    requirements: [
      '3+ years building high-throughput backend services using Node.js',
      'Strong grasp of relational and NoSQL databases (PostgreSQL / MongoDB)',
    ],
    skills: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'Docker', 'AWS'],
    experience: '3-5 years',
    companyLogo: '',
  },
  {
    title: 'UI/UX & Frontend Developer',
    company: 'Figma Design',
    location: 'Bengaluru, Karnataka (Hybrid)',
    salary: '₹10,00,000 - ₹14,00,000',
    jobType: 'Full-time',
    description: 'Bridge the gap between design systems and code. Build pixel-perfect interactive web interfaces using React, Framer Motion, and Tailwind CSS.',
    requirements: [
      '2+ years frontend development experience with a strong eye for UI animations',
      'Expertise in CSS, Tailwind CSS, Framer Motion, and HTML5 semantic markup',
    ],
    skills: ['React', 'Framer Motion', 'Tailwind CSS', 'UI/UX Design', 'Figma'],
    experience: '2-4 years',
    companyLogo: '',
  },
];

const seedJobs = async () => {
  try {
    const recruiterUser = await User.findOne({ email: 'recruiter@careerforge.com' });
    const seekerUser = await User.findOne({ email: 'seeker@careerforge.com' });
    const recruiterId = recruiterUser ? recruiterUser._id : null;

    // Clean up broken Unsplash logo strings from MongoDB
    await Job.updateMany(
      { companyLogo: { $regex: 'unsplash', $options: 'i' } },
      { $set: { companyLogo: '' } }
    );

    const jobCount = await Job.countDocuments();
    let seededJobs = [];

    if (jobCount === 0) {
      const jobsToInsert = sampleJobs.map((j) => ({
        ...j,
        postedBy: recruiterId,
      }));

      seededJobs = await Job.insertMany(jobsToInsert);
      console.log(`[Job Seed] Auto-seeded ${seededJobs.length} recruiter job postings.`);
    } else {
      seededJobs = await Job.find({ postedBy: recruiterId });
      if (seededJobs.length === 0) {
        await Job.updateMany({}, { postedBy: recruiterId });
        seededJobs = await Job.find({ postedBy: recruiterId });
      }
    }

    // Seed candidate applications if none exist
    const appCount = await Application.countDocuments();
    if (appCount === 0 && seekerUser && seededJobs.length > 0) {
      await Application.create([
        {
          job: seededJobs[0]._id,
          applicant: seekerUser._id,
          status: 'Shortlisted',
          coverNote: 'Extensive MERN stack & React experience. Looking forward to discussing this role!',
          resumeSnapshot: {
            atsScore: 94,
            name: seekerUser.name,
            email: seekerUser.email,
            phone: seekerUser.phone,
          },
        },
        {
          job: seededJobs[1]._id,
          applicant: seekerUser._id,
          status: 'Under Review',
          coverNote: 'Passionate about payment systems and API infrastructure.',
          resumeSnapshot: {
            atsScore: 89,
            name: seekerUser.name,
            email: seekerUser.email,
            phone: seekerUser.phone,
          },
        },
      ]);
      console.log(`[Application Seed] Auto-seeded sample applications for candidate Chhavi Kumari.`);
    }
  } catch (error) {
    console.error(`[Job Seed Error] ${error.message}`);
  }
};

module.exports = seedJobs;
