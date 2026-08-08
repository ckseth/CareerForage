import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  ArrowRight,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const applicationCardImages = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
];

const MyApplicationsPage = () => {
  const navigate = useNavigate();
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
          color: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: CheckCircle2,
        };
      case 'Shortlisted':
        return {
          label: 'Shortlisted',
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: Sparkles,
        };
      case 'Under Review':
        return {
          label: 'Under Review',
          color: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Clock,
        };
      case 'Rejected':
        return {
          label: 'Not Selected',
          color: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: AlertCircle,
        };
      case 'Applied':
      default:
        return {
          label: 'Applied',
          color: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: Briefcase,
        };
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Job Applications</h1>
              <Briefcase className="w-5 h-5 text-[#5B4BFF]" />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Track real-time candidate application status and recruiter updates
            </p>
          </div>

          <Link
            to="/jobs"
            className="px-5 py-2.5 text-xs font-bold text-white btn-gradient-brand self-start md:self-auto"
          >
            Explore More Jobs
          </Link>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          {['All', 'Applied', 'Under Review', 'Shortlisted', 'Selected', 'Rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#5B4BFF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-xs">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No applications found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't submitted any job applications under this status filter yet.
            </p>
            <Link
              to="/jobs"
              className="inline-block px-4 py-2 text-xs font-bold text-white btn-gradient-brand"
            >
              Browse Open Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredApps.map((app, idx) => {
              const badge = getStatusBadge(app.status);
              const BadgeIcon = badge.icon;
              const jobData = app.job || {};
              const cardImage = applicationCardImages[idx % applicationCardImages.length];

              return (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white border border-slate-200/90 rounded-3xl p-6 hover:shadow-soft-lg hover:border-[#5B4BFF]/30 transition-all duration-300 shadow-soft-sm min-h-[220px] flex flex-col md:flex-row gap-6 items-stretch group overflow-hidden"
                >
                  {/* Left Side: Large Visual Image Container */}
                  <div className="w-full md:w-60 h-48 md:h-auto rounded-2xl overflow-hidden relative shrink-0 bg-slate-100 border border-slate-100">
                    <img
                      src={cardImage}
                      alt={jobData.title || 'Job position'}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = applicationCardImages[0];
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                    {/* Company Logo Badge */}
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md text-[#5B4BFF] border border-white/40 flex items-center justify-center font-extrabold text-sm shadow-md">
                      {jobData.companyLogo || (jobData.company ? jobData.company.charAt(0) : 'J')}
                    </div>

                    {/* Image Overlay Tag: ATS Score */}
                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 text-[11px] font-extrabold text-emerald-300 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10">
                      <Target className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{app.resumeSnapshot?.atsScore || 92}% ATS Match</span>
                    </div>
                  </div>

                  {/* Right Side: Details & Action */}
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 hover:text-[#5B4BFF] transition-colors">
                          <Link to={`/jobs/${jobData._id}`}>{jobData.title || 'Position'}</Link>
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5 text-slate-400" /> {jobData.company || 'Company'}</span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {jobData.location || 'Location'}</span>
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div>
                        <span className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold border flex items-center gap-1.5 shadow-xs ${badge.color}`}>
                          <BadgeIcon className="w-3.5 h-3.5" />
                          {badge.label}
                        </span>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-slate-400 font-medium text-[11px]">Applied Date</span>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-slate-400 font-medium text-[11px]">Salary Range</span>
                        <p className="font-extrabold text-emerald-600 mt-0.5 flex items-center gap-0.5">
                          <span>₹</span>
                          <span>{formatINR(jobData.salary)}</span>
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-slate-400 font-medium text-[11px]">Job Type</span>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {jobData.jobType || 'Full-time'}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-slate-400 font-medium text-[11px]">Resume Applied</span>
                        <p className="font-bold text-[#5B4BFF] mt-0.5 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" /> Ready
                        </p>
                      </div>
                    </div>

                    {/* Cover Note snippet if exists */}
                    {app.coverNote && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 italic">
                        "<span className="text-slate-700">{app.coverNote}</span>"
                      </div>
                    )}

                    {/* Card Actions */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => navigate(`/jobs/${jobData._id}`)}
                        className="px-5 py-2 text-xs font-bold text-white btn-gradient-brand flex items-center gap-1.5 cursor-pointer"
                      >
                        View Job Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
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
