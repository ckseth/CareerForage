const Job = require('../models/Job');
const User = require('../models/User');

const sampleJobs = [
  {
    title: 'Senior Frontend Engineer (React & Vite)',
    company: 'Vercel Labs',
    location: 'San Francisco, CA (Remote)',
    salary: '$140,000 - $175,000',
    jobType: 'Full-time',
    description: 'We are seeking an experienced Senior Frontend Engineer to lead the development of high-performance web applications using React, Vite, and Tailwind CSS. You will collaborate directly with design and product teams to deliver lightning-fast UI experiences.',
    requirements: [
      '5+ years of experience with React.js and modern JavaScript (ES6+)',
      'Deep understanding of state management, performance tuning, and SSR/Vite build toolchains',
      'Extensive experience with Tailwind CSS and responsive design principles',
      'Strong knowledge of web accessibility (WCAG) and browser performance optimization',
    ],
    skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Vite', 'REST APIs'],
    experience: '4-6 years',
    companyLogo: 'V',
  },
  {
    title: 'Full-Stack Developer (MERN Stack)',
    company: 'Stripe Global',
    location: 'New York, NY (Hybrid)',
    salary: '$130,000 - $160,000',
    jobType: 'Full-time',
    description: 'Join Stripe to build robust payment developer tools using the MERN stack. You will architect Express REST endpoints, design MongoDB schemas, and craft intuitive React user interfaces.',
    requirements: [
      '3+ years of full-stack development experience with Node.js and React',
      'Proficiency in designing MongoDB collections and writing efficient Mongoose queries',
      'Experience with JWT authentication, role-based authorization, and security best practices',
      'Familiarity with CI/CD deployment pipelines and automated testing',
    ],
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'REST APIs'],
    experience: '3-5 years',
    companyLogo: 'S',
  },
  {
    title: 'Lead AI & Machine Learning Engineer',
    company: 'OpenCore AI Systems',
    location: 'Austin, TX (Remote)',
    salary: '$180,000 - $220,000',
    jobType: 'Full-time',
    description: 'OpenCore is looking for a Lead AI Engineer to fine-tune Large Language Models (LLMs) and build intelligent resume parsing and job-matching algorithms.',
    requirements: [
      '4+ years developing machine learning models and NLP applications in Python',
      'Hands-on experience with OpenAI APIs, PyTorch, or HuggingFace transformers',
      'Track record of deploying AI models to scalable cloud production environments',
    ],
    skills: ['Python', 'PyTorch', 'NLP', 'OpenAI API', 'FastAPI', 'Docker'],
    experience: '5+ years',
    companyLogo: 'O',
  },
  {
    title: 'Backend Node.js Engineer',
    company: 'Datadog Tech',
    location: 'Seattle, WA (Remote)',
    salary: '$125,000 - $155,000',
    jobType: 'Full-time',
    description: 'Help construct real-time telemetry and API services supporting millions of active developers worldwide using Node.js and Express.',
    requirements: [
      '3+ years building high-throughput backend services using Node.js',
      'Strong grasp of relational and NoSQL databases (PostgreSQL / MongoDB)',
      'Experience with Redis caching and microservices messaging',
    ],
    skills: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'Docker', 'AWS'],
    experience: '2-4 years',
    companyLogo: 'D',
  },
  {
    title: 'UI/UX & Frontend Developer',
    company: 'Figma Design',
    location: 'San Francisco, CA (Hybrid)',
    salary: '$115,000 - $140,000',
    jobType: 'Full-time',
    description: 'Bridge the gap between design systems and code. Build pixel-perfect interactive web interfaces using React, Framer Motion, and Tailwind CSS.',
    requirements: [
      '2+ years frontend development experience with a strong eye for UI animations',
      'Expertise in CSS, Tailwind CSS, Framer Motion, and HTML5 semantic markup',
    ],
    skills: ['React', 'Framer Motion', 'Tailwind CSS', 'UI/UX Design', 'Figma'],
    experience: '2-4 years',
    companyLogo: 'F',
  },
  {
    title: 'Junior Web Developer (Contract)',
    company: 'Nexus Creative Agency',
    location: 'Chicago, IL (Contract)',
    salary: '$70,000 - $90,000',
    jobType: 'Contract',
    description: 'Great opportunity for junior developers to work on diverse client web portals, building React frontend components and connecting Express REST APIs.',
    requirements: [
      'Solid understanding of HTML, CSS, JavaScript, and React basics',
      'Eager to learn and work under the mentorship of senior engineers',
    ],
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git'],
    experience: '0-2 years',
    companyLogo: 'N',
  },
];

const seedJobs = async () => {
  try {
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      // Find admin user or recruiter user to assign as postedBy
      const adminUser = await User.findOne({ role: 'admin' });
      const adminId = adminUser ? adminUser._id : null;

      const jobsToInsert = sampleJobs.map((j) => ({
        ...j,
        postedBy: adminId,
      }));

      await Job.insertMany(jobsToInsert);
      console.log(`[Job Seed] Auto-seeded ${jobsToInsert.length} sample tech job postings.`);
    } else {
      console.log(`[Job Seed] Jobs collection already populated (${jobCount} jobs found).`);
    }
  } catch (error) {
    console.error(`[Job Seed Error] ${error.message}`);
  }
};

module.exports = seedJobs;
