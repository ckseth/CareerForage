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
  Bot,
  Check,
  Clock,
  Building,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-slate-900 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-6 pb-16 sm:pt-8 sm:pb-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-indigo-50/20">

        {/* Soft Decorative Gradient Blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-indigo-200/40 via-purple-200/30 to-cyan-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5B4BFF]/10 border border-[#5B4BFF]/20 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#5B4BFF]" />
                <span className="text-xs font-bold text-[#5B4BFF] tracking-wide uppercase">
                  Smart Career Platform
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]"
              >
                Build Your Career. <br />
                <span className="text-gradient">
                  Find Your Next Opportunity.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Discover relevant opportunities, build ATS-friendly resumes, analyze your score out of 100, and track all your applications — all in one unified platform.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Link
                  to="/jobs"
                  className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white btn-gradient-brand flex items-center justify-center gap-3"
                >
                  <Briefcase className="w-5 h-5" />
                  Find Jobs
                </Link>

                <Link
                  to={isAuthenticated ? "/resume-builder" : "/signup"}
                  className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5 text-[#5B4BFF]" />
                  Build Resume
                </Link>
              </motion.div>

              {/* Social Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
              >
                <div>
                  <p className="text-2xl font-black text-slate-900">98%</p>
                  <p className="text-xs text-slate-500 font-medium">ATS Pass Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">10k+</p>
                  <p className="text-xs text-slate-500 font-medium">Verified Jobs</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">3x</p>
                  <p className="text-xs text-slate-500 font-medium">Interview Calls</p>
                </div>
              </motion.div>

            </div>

            {/* Hero Right Visual Composition */}
            <div className="lg:col-span-6 relative">

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mx-auto max-w-lg lg:max-w-none"
              >

                {/* Main Resume Mockup Container */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative z-10">

                  {/* Header Mock */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#5B4BFF] text-white font-black text-lg flex items-center justify-center shadow-sm">
                        CK
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base">Chhavi Kumari</h3>
                        <p className="text-xs text-[#5B4BFF] font-semibold">Full Stack MERN Developer</p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Candidate
                    </span>
                  </div>

                  {/* Mock Skills Chips */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Core Technical Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Tailwind CSS'].map((sk, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-[#5B4BFF]/10 text-[#5B4BFF] font-semibold text-[11px] border border-[#5B4BFF]/20">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mock Work Experience */}
                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Professional Experience</p>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-extrabold text-xs text-slate-900">TECHCORP SOLUTIONS</span>
                        <span className="text-[10px] text-slate-500 font-semibold">Jun 2023 – Present</span>
                      </div>
                      <p className="text-[11px] font-semibold text-[#5B4BFF]">Software Engineering Intern</p>
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        Architected responsive React.js UI components and optimized Express.js REST API endpoints...
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 1: 94% ATS Match */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-4 sm:-right-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl z-20 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#5B4BFF]/10 border border-[#5B4BFF]/20 flex items-center justify-center text-[#5B4BFF] font-black text-sm">
                    94%
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900">94% ATS Match</p>
                    <p className="text-[10px] text-emerald-600 font-bold">Passed Automated Screener</p>
                  </div>
                </motion.div>

                {/* Floating Card 2: 24 New Job Matches */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-6 -left-4 sm:-left-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl z-20 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-black text-sm">
                    24
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900">24 New Job Matches</p>
                    <p className="text-[10px] text-slate-500 font-medium">Matched to Your Profile</p>
                  </div>
                </motion.div>

                {/* Floating Card 3: Resume Score 94/100 */}
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-1/2 -right-8 hidden sm:flex bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xl z-20 items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                    94
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-slate-900">Resume Score</p>
                    <p className="text-[9px] text-[#5B4BFF] font-semibold">94/100 Quality Score</p>
                  </div>
                </motion.div>

              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* Structured Pastel Feature Blocks */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Everything You Need To Accelerate Your Career
            </h2>
            <p className="text-base text-slate-600 font-medium">
              CareerForge brings job discovery, ATS resume building, and intelligent scoring into one seamless platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Block 1 */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Find Verified Jobs</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Search tech positions with location and keyword filtering matched to your exact resume skills.
              </p>
              <Link to="/jobs" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700">
                Explore Jobs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Block 2 */}
            <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-6 space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">ATS Resume Builder</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Build ATS-friendly resumes with live preview, clean templates, and 1-click PDF export.
              </p>
              <Link to="/resume-builder" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700">
                Build Resume <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Block 3 */}
            <div className="bg-cyan-50/50 border border-cyan-100 rounded-2xl p-6 space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-xs">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">ATS Score Analyzer</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Scan your resume against HR algorithms, find missing keywords, and get actionable suggestions.
              </p>
              <Link to="/resume-analyzer" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 hover:text-cyan-700">
                Analyze Score <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Block 4 */}
            <div className="bg-coral-50/50 border border-coral-100 rounded-2xl p-6 space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-coral-500 text-white flex items-center justify-center shadow-xs">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Skill Job Matching</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Match candidate skills with technical job descriptions to maximize application success.
              </p>
              <Link to="/jobs" className="inline-flex items-center gap-1.5 text-xs font-bold text-coral-600 hover:text-coral-700">
                View Skill Matches <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
