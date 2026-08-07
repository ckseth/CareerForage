import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../layouts/DashboardLayout';
import { CardSkeleton, TableSkeleton } from '../components/common/SkeletonLoader';
import {
  PlusCircle,
  Briefcase,
  Users,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  UserCheck,
  Building,
  Sparkles
} from 'lucide-react';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Recruiter Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 p-6 rounded-2xl border border-amber-500/20 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">Recruiter Console – {user?.name}</h1>
              <Building className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-xs text-slate-300">Manage company openings, review ATS candidate scores, and hire talent.</p>
          </div>

          <button className="px-5 py-3 text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2">
            <PlusCircle className="w-4 h-4" /> Post New Job Opening
          </button>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Active Job Postings</span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">6 Openings</p>
                <p className="text-[11px] text-slate-400 mt-0.5">2 Senior engineering roles</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Total Applicants</span>
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">148</p>
                <p className="text-[11px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +28 this week
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Top ATS Matches (&gt;85%)</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">36 Candidates</p>
                <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Ready for screening</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Interviews Scheduled</span>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">9</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Next scheduled tomorrow</p>
              </div>
            </div>
          </div>
        )}

        {/* Top Shortlisted Candidates Table */}
        {loading ? (
          <TableSkeleton rows={4} />
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Top Scored Candidates</h3>
                <p className="text-xs text-slate-400">Auto-ranked by ATS resume keyword & experience match</p>
              </div>
              <button className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                View All Candidates <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Candidate Name</th>
                    <th className="py-3 px-4">Applied Position</th>
                    <th className="py-3 px-4">ATS Match</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    {
                      name: 'Sarah Jenkins',
                      email: 'sarah.j@example.com',
                      role: 'Senior React Developer',
                      score: '96%',
                      location: 'San Francisco, CA',
                    },
                    {
                      name: 'David Miller',
                      email: 'david.m@example.com',
                      role: 'Senior React Developer',
                      score: '91%',
                      location: 'New York, NY',
                    },
                    {
                      name: 'Priya Sharma',
                      email: 'priya.s@example.com',
                      role: 'MERN Lead Architect',
                      score: '89%',
                      location: 'Austin, TX',
                    },
                  ].map((cand, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-white">{cand.name}</p>
                        <p className="text-[11px] text-slate-400">{cand.email}</p>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-200">{cand.role}</td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-400">{cand.score}</td>
                      <td className="py-3.5 px-4 text-slate-400">{cand.location}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button className="px-3 py-1.5 text-[11px] font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-lg">
                          Review Resume
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

export default RecruiterDashboard;
