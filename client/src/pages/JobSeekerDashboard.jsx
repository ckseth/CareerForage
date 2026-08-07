import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../layouts/DashboardLayout';
import { CardSkeleton, TableSkeleton } from '../components/common/SkeletonLoader';
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
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-brand-900/60 via-slate-900 to-slate-950 p-6 rounded-2xl border border-brand-500/20 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">Welcome back, {user?.name || 'Candidate'}!</h1>
              <Sparkles className="w-5 h-5 text-brand-400" />
            </div>
            <p className="text-xs text-slate-300">Your ATS resume is optimized and ready for top engineering roles.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/resume-builder" className="px-4 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-600/25 transition-all flex items-center gap-2">
              <FileText className="w-4 h-4" /> Build Resume
            </Link>
            <Link to="/resume-analyzer" className="px-4 py-2.5 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" /> Analyze ATS Score
            </Link>
          </div>
        </div>

        {/* Stat Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Stat 1 */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">ATS Resume Score</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">94 / 100</p>
                <p className="text-[11px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Excellent ATS match
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Active Applications</span>
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">12</p>
                <p className="text-[11px] text-slate-400 mt-0.5">3 Under recruiter review</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Saved Jobs</span>
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Bookmark className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">8</p>
                <p className="text-[11px] text-slate-400 mt-0.5">2 Closing this week</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Job Matches Found</span>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">24</p>
                <p className="text-[11px] text-cyan-400 font-semibold mt-0.5">&gt; 90% Skill alignment</p>
              </div>
            </div>

          </div>
        )}

        {/* Recent Applications Section */}
        {loading ? (
          <TableSkeleton rows={3} />
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Recent Applications</h3>
                <p className="text-xs text-slate-400">Track your application status and recruiter feedback</p>
              </div>
              <button className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1">
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Role & Company</th>
                    <th className="py-3 px-4">Applied Date</th>
                    <th className="py-3 px-4">ATS Match</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    {
                      role: 'Senior React Developer',
                      company: 'Vercel Inc.',
                      date: 'Aug 04, 2026',
                      match: '96%',
                      status: 'Interview Scheduled',
                      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                    },
                    {
                      role: 'Full-Stack Software Engineer',
                      company: 'Stripe',
                      date: 'Aug 02, 2026',
                      match: '92%',
                      status: 'Under Review',
                      badge: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
                    },
                    {
                      role: 'MERN Stack Lead',
                      company: 'Datadog',
                      date: 'Jul 28, 2026',
                      match: '88%',
                      status: 'Applied',
                      badge: 'bg-slate-800 text-slate-400 border-slate-700',
                    },
                  ].map((app, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-white">{app.role}</p>
                        <p className="text-[11px] text-slate-400">{app.company}</p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{app.date}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-400">{app.match}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${app.badge}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button className="text-xs font-semibold text-slate-400 hover:text-white">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default JobSeekerDashboard;
