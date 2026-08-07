import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../hooks/useAuth';
import {
  Sparkles,
  Briefcase,
  FileText,
  Cpu,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Search,
  MapPin,
  DollarSign,
  Award,
  Zap,
  Layers,
  BarChart3,
  Bot
} from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="flex-grow">
        {/* ==================================================== */}
        {/* HERO SECTION WITH DYNAMIC VISUALS */}
        {/* ==================================================== */}
        <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
          
          {/* Ambient Glow Background Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Copy & CTAs */}
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold tracking-wide uppercase shadow-inner"
                >
                  <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
                  <span>Next-Gen AI Career & ATS Platform</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
                >
                  Build Your Career. <br />
                  <span className="text-gradient">Find Your Job.</span> Get Hired.
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
                >
                  Discover opportunities, build ATS-friendly resumes, and optimize your career profile with intelligent tools.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
                >
                  <Link
                    to={isAuthenticated ? "/resume-builder" : "/signup"}
                    className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 rounded-xl shadow-xl shadow-brand-600/30 hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1"
                  >
                    <FileText className="w-5 h-5" />
                    Build My Resume
                  </Link>

                  <a
                    href="#jobs"
                    className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Briefcase className="w-5 h-5 text-brand-400" />
                    Explore Jobs
                  </a>
                </motion.div>

                {/* Social Proof Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left"
                >
                  <div>
                    <p className="text-2xl font-extrabold text-white">98.4%</p>
                    <p className="text-xs text-slate-400 font-medium">ATS Pass Rate</p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-white">12,500+</p>
                    <p className="text-xs text-slate-400 font-medium">Active Jobs</p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-white">4.9/5</p>
                    <p className="text-xs text-slate-400 font-medium">User Rating</p>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Hero Visual Mockup with Animations */}
              <div className="lg:col-span-5 relative mt-8 lg:mt-0">
                
                {/* Main Visual Card Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="relative mx-auto max-w-md lg:max-w-none glass-card rounded-2xl p-6 shadow-2xl border border-slate-700/60 overflow-hidden"
                >
                  {/* Visual Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">CareerForge AI Studio v2.4</span>
                  </div>

                  {/* Resume Mockup Preview */}
                  <div className="mt-4 bg-slate-900/90 rounded-xl p-5 border border-slate-800 space-y-4">
                    
                    {/* Header Candidate Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 shadow-md">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                          alt="Candidate Avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Sarah Jenkins</h4>
                        <p className="text-xs text-brand-400 font-medium">Senior Full-Stack Engineer</p>
                      </div>
                    </div>

                    {/* Progress Bar & Skills */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">ATS Keyword Optimization</span>
                        <span className="text-emerald-400">96% Optimized</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 w-[96%]" />
                      </div>
                    </div>

                    {/* Highlights tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] text-slate-300 border border-slate-700">React.js</span>
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] text-slate-300 border border-slate-700">Node.js</span>
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] text-slate-300 border border-slate-700">MongoDB</span>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-[11px] text-emerald-400 border border-emerald-500/20 font-semibold">ATS Passed</span>
                    </div>

                  </div>

                  {/* Dynamic Floating Badge 1: ATS Match Score */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -top-4 -left-4 bg-slate-900/95 border border-emerald-500/40 p-3 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-md"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-extrabold text-sm">
                      94%
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">ATS Score Match</p>
                      <p className="text-[10px] text-slate-400">High hiring probability</p>
                    </div>
                  </motion.div>

                  {/* Dynamic Floating Badge 2: Recent Job Alert */}
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-5 -right-4 bg-slate-900/95 border border-indigo-500/40 p-3.5 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-md max-w-[220px]"
                  >
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-white truncate">Lead Engineer</p>
                      <p className="text-[10px] text-emerald-400 font-semibold">$150k - $180k/yr</p>
                    </div>
                  </motion.div>

                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* HOW IT WORKS SECTION */}
        {/* ==================================================== */}
        <section className="py-20 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-extrabold tracking-wider uppercase text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
                Simple 4-Step Pipeline
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How CareerForge Works</h2>
              <p className="text-slate-400 text-base">
                From building an optimized ATS resume to getting matched with top-tier tech roles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Create Account',
                  desc: 'Sign up as a Job Seeker or Recruiter in under 30 seconds.',
                  icon: Users,
                  color: 'from-blue-500 to-indigo-600',
                },
                {
                  step: '02',
                  title: 'Build or Import Resume',
                  desc: 'Use our ATS-formatted builder or upload your existing document.',
                  icon: FileText,
                  color: 'from-indigo-500 to-purple-600',
                },
                {
                  step: '03',
                  title: 'AI ATS Scoring',
                  desc: 'Instant keyword matching, formatting audit, and role match percentage.',
                  icon: Cpu,
                  color: 'from-purple-500 to-pink-600',
                },
                {
                  step: '04',
                  title: 'Apply & Get Hired',
                  desc: 'Direct application tracking and recruiters reaching out to you.',
                  icon: CheckCircle2,
                  color: 'from-pink-500 to-rose-600',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 relative border border-slate-800 hover:border-brand-500/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} p-3 flex items-center justify-center shadow-lg`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-3xl font-black text-slate-800 group-hover:text-brand-500/40 transition-colors">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* JOB PORTAL FEATURE SECTION */}
        {/* ==================================================== */}
        <section id="jobs" className="py-20 bg-slate-900/40 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs font-extrabold uppercase text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  Smart Job Portal
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-3">Featured Job Opportunities</h2>
                <p className="text-slate-400 text-sm mt-1">Explore verified openings with transparent salary ranges.</p>
              </div>
              <Link
                to="/signup"
                className="px-5 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center gap-2"
              >
                View All 12,500+ Jobs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Featured Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Senior Frontend Engineer (React)',
                  company: 'Vercel Labs',
                  location: 'San Francisco, CA (Remote)',
                  salary: '$140,000 - $175,000',
                  tags: ['React', 'TypeScript', 'Tailwind'],
                  logo: 'V',
                  match: '98% Match',
                },
                {
                  title: 'Full-Stack Developer (MERN)',
                  company: 'Stripe Global',
                  location: 'New York, NY (Hybrid)',
                  salary: '$130,000 - $160,000',
                  tags: ['MongoDB', 'Express', 'Node.js'],
                  logo: 'S',
                  match: '94% Match',
                },
                {
                  title: 'Lead AI Engineer',
                  company: 'OpenCore Systems',
                  location: 'Austin, TX (Remote)',
                  salary: '$180,000 - $220,000',
                  tags: ['Python', 'PyTorch', 'LLMs'],
                  logo: 'O',
                  match: '91% Match',
                },
              ].map((job, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-brand-500/50 transition-all duration-300 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-extrabold text-indigo-400">
                        {job.logo}
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {job.match}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1 hover:text-brand-400 cursor-pointer transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mb-3">{job.company}</p>
                    
                    <div className="space-y-1.5 text-xs text-slate-400 mb-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" /> {job.location}
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {job.salary}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {job.tags.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-[11px] text-slate-400 border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/signup"
                    className="w-full py-2.5 text-center text-xs font-bold text-white bg-slate-900 hover:bg-brand-600 rounded-lg border border-slate-800 hover:border-brand-500 transition-all"
                  >
                    Quick Apply
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* ATS RESUME BUILDER & ANALYZER SECTION */}
        {/* ==================================================== */}
        <section id="resume-builder" className="py-20 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <span className="text-xs font-extrabold uppercase text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  ATS Resume Suite
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  Beat the Applicant Tracking System (ATS) Every Time.
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Over 75% of resumes are rejected before human recruiters ever see them. CareerForge guarantees your resume is formatted, parsed, and scored to bypass automated filters.
                </p>

                <div className="space-y-4 pt-2">
                  {[
                    'Instant ATS Keyword Analysis against target job descriptions',
                    'Single-column cleanly parsable templates designed for HR software',
                    'Real-time bullet point strength score and action verb recommendations',
                    'Export to clean PDF or editable JSON formats seamlessly',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-300 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-600/25 transition-all"
                  >
                    Build ATS Resume Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Interactive Visual Showcase */}
              <div id="analyzer" className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-brand-400" />
                    <span className="text-sm font-bold text-white">Live Resume Analyzer</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    ATS Audit Complete
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
                    <p className="text-2xl font-extrabold text-white">92 / 100</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-1">Format & Layout Score</p>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
                    <p className="text-2xl font-extrabold text-cyan-400">88 / 100</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-1">Keyword Match Score</p>
                  </div>
                </div>

                <div className="space-y-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-slate-200">Missing Key Skills Identified:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 text-xs border border-rose-500/20 font-mono">+ Docker</span>
                    <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 text-xs border border-rose-500/20 font-mono">+ Kubernetes</span>
                    <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 text-xs border border-rose-500/20 font-mono">+ AWS S3</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* RECRUITER FEATURES */}
        {/* ==================================================== */}
        <section className="py-20 bg-slate-900/40 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-extrabold uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                For Employers & Recruiters
              </span>
              <h2 className="text-3xl font-extrabold text-white">Hire Qualified Candidates 5x Faster</h2>
              <p className="text-slate-400 text-sm">
                Streamline job postings, auto-rank candidate applications by ATS score, and manage pipelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Smart Candidate Ranking',
                  desc: 'Applications are automatically sorted by ATS match percentage for instant shortlisting.',
                  icon: TrendingUp,
                },
                {
                  title: 'One-Click Job Posting',
                  desc: 'Publish tech roles with rich salary ranges, skills tags, and instant recruiter analytics.',
                  icon: Zap,
                },
                {
                  title: 'Pipeline Management',
                  desc: 'Track candidate status from Applied, Reviewed, Interviewing, to Hired.',
                  icon: Layers,
                },
              ].map((rec, i) => (
                <div key={i} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                    <rec.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{rec.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* TESTIMONIALS SECTION */}
        {/* ==================================================== */}
        <section id="about" className="py-20 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-extrabold uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Success Stories
              </span>
              <h2 className="text-3xl font-extrabold text-white">Loved by Candidates & Recruiters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "CareerForge's ATS resume builder bumped my interview response rate from 5% to 45% within two weeks!",
                  name: 'Alex Rivera',
                  role: 'Full-Stack Developer at Meta',
                  stars: 5,
                },
                {
                  quote: "As a recruiter, sorting 500+ applicants manually was painful. CareerForge sorts top matches instantly.",
                  name: 'Elena Rostova',
                  role: 'Head of Talent at Nexus Labs',
                  stars: 5,
                },
                {
                  quote: "The live keyword analyzer showed exactly which technical skills were missing from my resume.",
                  name: 'Marcus Chen',
                  role: 'DevOps Specialist at Cloudflare',
                  stars: 5,
                },
              ].map((t, idx) => (
                <div key={idx} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex gap-1 text-amber-400">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-xs italic leading-relaxed">"{t.quote}"</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-800/80">
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <p className="text-[11px] text-brand-400">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* CALL TO ACTION BANNER */}
        {/* ==================================================== */}
        <section className="py-16 bg-gradient-to-r from-brand-900/80 via-slate-900 to-indigo-950 border-t border-b border-brand-500/20 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Accelerate Your Career Journey?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Join thousands of job seekers and employers using CareerForge to match, build, and hire.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-3.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-xl shadow-brand-600/30 transition-all transform hover:-translate-y-0.5"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
