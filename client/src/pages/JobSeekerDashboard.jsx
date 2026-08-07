import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../layouts/DashboardLayout';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import {
  FileText,
  Cpu,
  Briefcase,
  Bookmark,
  TrendingUp,
  Award,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Building,
  Target,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const recentApplications = [
    { logo: 'https://logo.clearbit.com/stripe.com', name: 'Stripe', role: 'Full-Stack Developer (MERN)', loc: 'New York, NY', date: 'Jul 24, 2026', match: '96%', status: 'Shortlisted', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { logo: 'https://logo.clearbit.com/vercel.com', name: 'Vercel', role: 'Senior React UI Engineer', loc: 'Remote', date: 'Jul 20, 2026', match: '94%', status: 'Under Review', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { logo: 'https://logo.clearbit.com/datadoghq.com', name: 'Datadog', role: 'Backend Node.js Architect', loc: 'San Francisco, CA', date: 'Jul 15, 2026', match: '90%', status: 'Applied', color: 'bg-slate-100 text-slate-700 border-slate-200' },
    { logo: 'https://logo.clearbit.com/figma.com', name: 'Figma', role: 'Frontend Systems Engineer', loc: 'Remote', date: 'Jul 10, 2026', match: '88%', status: 'Selected', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10 max-w-7xl mx-auto">
        
        {/* Welcome Hero Banner Card with Real Unsplash Image Composition */}
        <div className="bg-gradient-to-r from-[#5B4BFF] via-[#7C3AED] to-[#4338CA] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Welcome back, {user?.name || 'Chhavi'}!
                </h1>
                <Sparkles className="w-7 h-7 text-amber-300" />
              </div>
              <p className="text-base text-indigo-100 font-medium leading-relaxed max-w-lg">
                Your career dashboard is ready. Discover relevant opportunities, build ATS-friendly resumes, and track your applications — all in one place.
              </p>

              <div className="flex items-center gap-3 pt-3 flex-wrap">
                <Link
                  to="/resume-builder"
                  className="px-7 py-3.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-2xl shadow-md transition-all flex items-center gap-2"
                >
                  <FileText className="w-4.5 h-4.5 text-[#5B4BFF]" /> Build My Resume
                </Link>
                <Link
                  to="/jobs"
                  className="px-7 py-3.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl border border-white/20 transition-all flex items-center gap-2"
                >
                  <Briefcase className="w-4.5 h-4.5 text-amber-300" /> Find Jobs
                </Link>
              </div>
            </div>

            {/* Right Visual Image Composite */}
            <div className="lg:col-span-5 relative hidden sm:block">
              <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/20 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                  alt="Professional Candidate Executive Portrait"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/30" />
              </div>

              {/* Floating Card: 94% ATS Score */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -left-5 bg-white text-slate-900 border border-slate-200 rounded-2xl p-3.5 shadow-xl z-20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#5B4BFF] font-black text-sm flex items-center justify-center">
                  94
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold">94% ATS Score</p>
                  <p className="text-[10px] text-emerald-600 font-bold">Passed Automated Screener</p>
                </div>
              </motion.div>

            </div>

          </div>
        </div>

        {/* 4 Modern Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: ATS Resume Score */}
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-xs flex items-center justify-between hover:shadow-md transition-all">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-semibold">ATS Resume Score</p>
              <p className="text-3xl font-black text-slate-900">94 <span className="text-xs font-normal text-slate-400">/ 100</span></p>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                <CheckCircle2 className="w-3 h-3" /> Excellent ATS Match
              </span>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#5B4BFF] font-black text-xl shadow-xs">
              94
            </div>
          </div>

          {/* Card 2: Active Applications */}
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-xs flex items-center justify-between hover:shadow-md transition-all">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-semibold">Active Applications</p>
              <p className="text-3xl font-black text-slate-900">12</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                <Clock className="w-3 h-3" /> 3 Under Review
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#5B4BFF] flex items-center justify-center font-bold">
              <Briefcase className="w-7 h-7" />
            </div>
          </div>

          {/* Card 3: Saved Jobs */}
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-xs flex items-center justify-between hover:shadow-md transition-all">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-semibold">Saved Jobs</p>
              <p className="text-3xl font-black text-slate-900">8</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-coral-600 bg-coral-50 px-2.5 py-0.5 rounded-full border border-coral-100">
                <Bookmark className="w-3 h-3" /> 2 Closing This Week
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-coral-50 text-[#FF6B4A] flex items-center justify-center font-bold">
              <Bookmark className="w-7 h-7" />
            </div>
          </div>

          {/* Card 4: Job Matches */}
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-xs flex items-center justify-between hover:shadow-md transition-all">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-semibold">Job Matches</p>
              <p className="text-3xl font-black text-slate-900">24</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                <Target className="w-3 h-3" /> 90% Skill Alignment
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#14B8A6] flex items-center justify-center font-bold">
              <Target className="w-7 h-7" />
            </div>
          </div>

        </div>

        {/* Recent Applications Section - Rendered as Visual Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Applications</h3>
              <p className="text-xs text-slate-500 font-medium">Track real-time candidate application status and recruiter updates</p>
            </div>
            <Link to="/applications" className="text-xs font-bold text-[#5B4BFF] hover:text-indigo-700 flex items-center gap-1">
              View All Applications <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 2-Column Application Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentApplications.map((app, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={app.logo}
                      alt={app.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=100&q=80';
                      }}
                      className="w-12 h-12 rounded-2xl object-contain bg-slate-50 p-2 border border-slate-200 shadow-2xs"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-base group-hover:text-[#5B4BFF] transition-colors">{app.role}</h4>
                      <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" /> {app.name}
                      </p>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold border shrink-0 ${app.color}`}>
                    {app.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {app.loc}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {app.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#5B4BFF] bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100">
                      {app.match} ATS Match
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    to="/applications"
                    className="w-full py-2.5 text-center text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    View Application Details <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default JobSeekerDashboard;
