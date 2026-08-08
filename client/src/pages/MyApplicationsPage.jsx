import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchMyApplications } from '../services/jobService';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import { formatINR } from '../utils/formatters';
import {
  Briefcase,
  Clock,
  Building,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  FileText,
  DollarSign,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await fetchMyApplications();
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error('Failed to load applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const filteredApps = statusFilter === 'All'
    ? applications
    : applications.filter((app) => app.status === statusFilter);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Selected':
        return {
          label: 'Selected / Hired',
          color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          icon: CheckCircle2,
        };
      case 'Shortlisted':
        return {
          label: 'Shortlisted',
          color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: Sparkles,
        };
      case 'Under Review':
        return {
          label: 'Under Review',
          color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
          icon: Clock,
        };
      case 'Rejected':
        return {
          label: 'Not Selected',
          color: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          icon: AlertCircle,
        };
      case 'Applied':
      default:
        return {
          label: 'Applied',
          color: 'bg-brand-500/10 text-brand-400 border-brand-500/30',
          icon: Briefcase,
        };
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">My Job Applications</h1>
              <Briefcase className="w-5 h-5 text-brand-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Track real-time candidate application status and recruiter updates
            </p>
          </div>

          <Link
            to="/jobs"
            className="px-4 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-md transition-all self-start md:self-auto"
          >
            Explore More Jobs
          </Link>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl">
          {['All', 'Applied', 'Under Review', 'Shortlisted', 'Selected', 'Rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                statusFilter === st
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Application Cards List */}
        {loading ? (
          <div className="space-y-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No applications found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You haven't submitted any job applications under this status filter yet.
            </p>
            <Link
              to="/jobs"
              className="inline-block px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-md"
            >
              Browse Open Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app) => {
              const badge = getStatusBadge(app.status);
              const BadgeIcon = badge.icon;
              const jobData = app.job || {};

              return (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300 shadow-xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 p-0.5 shadow-md shrink-0">
                        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-extrabold text-white text-lg">
                          {jobData.companyLogo || (jobData.company ? jobData.company.charAt(0) : 'J')}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white hover:text-brand-400 transition-colors">
                          <Link to={`/jobs/${jobData._id}`}>{jobData.title || 'Position'}</Link>
                        </h3>
                        <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                          <Building className="w-3.5 h-3.5 text-slate-500" /> {jobData.company || 'Company'}
                          <span className="text-slate-600">•</span>
                          <MapPin className="w-3.5 h-3.5 text-slate-500" /> {jobData.location || 'Location'}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold border flex items-center gap-1.5 ${badge.color}`}>
                        <BadgeIcon className="w-3.5 h-3.5" />
                        {badge.label}
                      </span>
                    </div>
                  </div>

                  {/* Info Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
                    <div>
                      <span className="text-slate-500">Applied Date:</span>
                      <p className="font-semibold text-slate-200 mt-0.5">
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Salary Range:</span>
                      <p className="font-semibold text-emerald-400 mt-0.5">
                        {formatINR(jobData.salary)}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Job Type:</span>
                      <p className="font-semibold text-slate-200 mt-0.5">
                        {jobData.jobType || 'Full-time'}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">ATS Resume Score:</span>
                      <p className="font-bold text-brand-400 mt-0.5 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> {app.resumeSnapshot?.atsScore || 92}% Match
                      </p>
                    </div>
                  </div>

                  {/* Cover Note preview if provided */}
                  {app.coverNote && (
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 italic">
                      "<span className="text-slate-400">{app.coverNote}</span>"
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default MyApplicationsPage;
