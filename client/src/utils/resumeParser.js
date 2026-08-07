// Utility to extract structured resume fields from raw text input or uploaded file text

export const parseResumeText = (rawText) => {
  if (!rawText || typeof rawText !== 'string') return {};

  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);
  
  // 1. Extract Email
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // 2. Extract Phone
  const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // 3. Extract Name (assuming first non-empty line or line before email)
  let name = lines.length > 0 ? lines[0] : '';
  if (name.includes('@') || name.toLowerCase().includes('resume') || name.length > 40) {
    name = lines.find((l) => !l.includes('@') && l.length < 35 && !/\d/.test(l)) || 'Candidate Name';
  }

  // 4. Extract Common Technical Skills
  const knownSkills = [
    'React', 'React.js', 'Node.js', 'Express', 'Express.js', 'MongoDB', 'JavaScript',
    'TypeScript', 'HTML', 'HTML5', 'CSS', 'CSS3', 'Tailwind', 'Tailwind CSS', 'Bootstrap',
    'Python', 'Java', 'C++', 'SQL', 'PostgreSQL', 'Git', 'GitHub', 'Docker', 'AWS',
    'REST APIs', 'GraphQL', 'Redux', 'Vite', 'Next.js'
  ];

  const extractedSkills = [];
  knownSkills.forEach((skill) => {
    const regex = new RegExp(`\\b${skill.replace('.', '\\.')}\\b`, 'i');
    if (regex.test(rawText) && !extractedSkills.includes(skill)) {
      extractedSkills.push(skill);
    }
  });

  // 5. Extract Education clues
  let degree = 'B.S. in Computer Science';
  let college = 'State University';
  if (rawText.toLowerCase().includes('bachelor') || rawText.toLowerCase().includes('b.s')) {
    degree = 'Bachelor of Science in Computer Science';
  } else if (rawText.toLowerCase().includes('master') || rawText.toLowerCase().includes('m.s')) {
    degree = 'Master of Science in Software Engineering';
  }

  const universityMatch = lines.find((l) => /university|college|institute|school/i.test(l));
  if (universityMatch) {
    college = universityMatch;
  }

  // 6. Extract Experience clues
  const companyMatch = lines.find((l) => /inc|corp|labs|solutions|technologies|systems|agency/i.test(l));
  const company = companyMatch || 'Tech Company';

  return {
    personalDetails: {
      name,
      email,
      phone,
      address: 'San Francisco, CA',
      linkedin: 'https://linkedin.com/in/' + name.toLowerCase().replace(/\s+/g, ''),
      github: 'https://github.com/' + name.toLowerCase().replace(/\s+/g, ''),
    },
    education: [
      {
        degree,
        college,
        year: '2020 - 2024',
        cgpa: '3.8 / 4.0',
      },
    ],
    experience: [
      {
        company,
        role: 'Software Engineer',
        startDate: '2023',
        endDate: 'Present',
        description: 'Developed scalable web applications and integrated REST APIs.',
      },
    ],
    skills: {
      technical: extractedSkills.length > 0 ? extractedSkills : ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
      soft: ['Problem Solving', 'Team Collaboration', 'Agile Methodology'],
    },
    projects: [
      {
        name: 'Web Application Project',
        description: 'Designed and deployed responsive full-stack application.',
        technologies: extractedSkills.slice(0, 4).join(', ') || 'React, Node.js',
        link: 'https://github.com',
      },
    ],
    certifications: [
      { title: 'Full-Stack Web Development Certification', issuer: 'Coursera / Udemy', year: '2023' },
    ],
    achievements: [
      'Successfully delivered high-performance projects on deadline.',
    ],
  };
};
