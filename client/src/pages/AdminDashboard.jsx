import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../layouts/DashboardLayout';
import { CardSkeleton, TableSkeleton } from '../components/common/SkeletonLoader';
import {
  ShieldCheck,
  Users,
  Building,
  Briefcase,
  FileCheck,
  TrendingUp,
  Activity,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 p-6 rounded-2xl border border-rose-500/20 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">System Administration Console</h1>
              <ShieldCheck className="w-5 h-5 text-rose-400" />
            </div>
            <p className="text-xs text-slate-300">Oversee users, recruiters, job listings, platform analytics, and security policy.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              API Server Online
            </span>
          </div>
        </div>

        {/* System Stat Cards */}
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
                <span className="text-xs font-semibold text-slate-400">Total Users Registered</span>
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">3,420</p>
                <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">+14% month-over-month</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Verified Recruiters</span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Building className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">245</p>
                <p className="text-[11px] text-slate-400 mt-0.5">8 pending verifications</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Active Job Listings</span>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">1,280</p>
                <p className="text-[11px] text-slate-400 mt-0.5">99.2% compliance score</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Total Applications</span>
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <FileCheck className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">14,920</p>
                <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">High platform engagement</p>
              </div>
            </div>
          </div>
        )}

        {/* User Management & Audit Log */}
        {loading ? (
          <TableSkeleton rows={4} />
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Recent System User Registrations</h3>
                <p className="text-xs text-slate-400">Audit log of latest accounts created across the system</p>
              </div>
              <button className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1">
                Manage All Users <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Registration Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    {
                      name: 'System Admin',
                      email: 'admin@careerforge.com',
                      role: 'Admin',
                      date: 'System Pre-seeded',
                      status: 'Verified',
                      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
                    },
                    {
                      name: 'Elena Rostova',
                      email: 'elena@nexus.com',
                      role: 'Recruiter',
                      date: 'Aug 06, 2026',
                      status: 'Verified',
                      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                    },
                    {
                      name: 'Alex Morgan',
                      email: 'alex@example.com',
                      role: 'Job Seeker',
                      date: 'Aug 07, 2026',
                      status: 'Verified',
                      badge: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
                    },
                  ].map((usr, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-white">{usr.name}</p>
                        <p className="text-[11px] text-slate-400">{usr.email}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${usr.badge}`}>
                          {usr.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{usr.date}</td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-400">{usr.status}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button className="text-xs font-semibold text-slate-400 hover:text-white">
                          Edit Role
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

export default AdminDashboard;
