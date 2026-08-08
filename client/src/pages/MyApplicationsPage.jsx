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
  Target,
  X,
  Eye,
  Calendar,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [selectedAppModal, setSelectedAppModal] = useState(null);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await fetchMyApplications();
      if (data.success) {
        setApplications(data.applications || []);
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
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Job Applications</h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#5B4BFF]/10 text-[#5B4BFF] border border-[#5B4BFF]/20">
                {applications.length} Total Submitted
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Track real-time hiring status updates, recruiter reviews, and ATS match ratings across all submitted job applications.
            </p>
          </div>

          <Link
            to="/jobs"
            className="px-5 py-3 text-xs font-bold text-white btn-gradient-brand flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            Explore More Jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {['All', 'Applied', 'Under Review', 'Shortlisted', 'Selected', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#5B4BFF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {status} {status === 'All' ? `(${applications.length})` : ''}
            </button>
          ))}
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="space-y-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto shadow-soft-sm">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-[#5B4BFF] mx-auto flex items-center justify-center font-bold">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">No Applications Found</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {statusFilter === 'All'
                  ? "You haven't submitted any job applications yet."
                  : `No applications found with status "${statusFilter}".`}
              </p>
            </div>
            <Link
              to="/jobs"
              className="inline-flex px-6 py-3 text-xs font-bold text-white btn-gradient-brand"
            >
              Find Jobs & Apply Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app, index) => {
              const jobData = app.job || {};
              const badge = getStatusBadge(app.status);
              const BadgeIcon = badge.icon;
              const cardImage = applicationCardImages[index % applicationCardImages.length];

              return (
                <motion.div
                  key={app._id || index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-stretch"
                >
                  {/* Left Side: Job Card Image */}
                  <div className="w-full md:w-56 h-40 md:h-auto rounded-2xl overflow-hidden relative shrink-0 border border-slate-100">
                    <img
                      src={cardImage}
                      alt={jobData.title || 'Job Card'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                    {/* Company Logo Badge */}
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md text-[#5B4BFF] border border-white/40 flex items-center justify-center font-extrabold text-sm shadow-md">
                      {jobData.companyLogo ? (
                        <img
                          src={jobData.companyLogo}
                          alt={jobData.company}
                          className="w-full h-full object-cover rounded-xl"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.parentElement) {
                              e.target.parentElement.innerText = jobData.company?.charAt(0) || 'C';
                            }
                          }}
                        />
                      ) : (
                        jobData.company ? jobData.company.charAt(0) : 'J'
                      )}
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
                          {new Date(app.appliedDate || app.createdAt || Date.now()).toLocaleDateString()}
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
                        <span className="text-slate-400 font-medium text-[11px]">Resume Snapshot</span>
                        <p className="font-bold text-[#5B4BFF] mt-0.5 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" /> Attached
                        </p>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        onClick={() => setSelectedAppModal(app)}
                        className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#5B4BFF]" /> Application Details
                      </button>
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

        {/* APPLICATION DETAIL MODAL — Displays SPECIFIC application data */}
        <AnimatePresence>
          {selectedAppModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#5B4BFF]/10 text-[#5B4BFF] font-black text-base flex items-center justify-center border border-[#5B4BFF]/20">
                      {selectedAppModal.job?.companyLogo || (selectedAppModal.job?.company ? selectedAppModal.job.company.charAt(0) : 'C')}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {selectedAppModal.job?.title || 'Application Details'}
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold flex items-center gap-2 mt-0.5">
                        <span>{selectedAppModal.job?.company || 'Company'}</span>
                        <span>•</span>
                        <span>{selectedAppModal.job?.location || 'Location'}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedAppModal(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Status Badge & Applied Date */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Current Application Status</span>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold border flex items-center gap-1.5 ${getStatusBadge(selectedAppModal.status).color}`}>
                        {selectedAppModal.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Submitted On</span>
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1 justify-end pt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-[#5B4BFF]" />
                      {new Date(selectedAppModal.appliedDate || selectedAppModal.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Hiring Status Timeline Stepper */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Recruitment Process Pipeline</label>
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl grid grid-cols-4 gap-2 text-center text-[11px] font-bold">
                    {['Applied', 'Under Review', 'Shortlisted', 'Selected'].map((step, idx) => {
                      const statuses = ['Applied', 'Under Review', 'Shortlisted', 'Selected'];
                      const currentIdx = statuses.indexOf(selectedAppModal.status);
                      const isReached = currentIdx >= idx;

                      return (
                        <div key={step} className="space-y-1">
                          <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center transition-all ${
                            isReached ? 'bg-[#5B4BFF] text-white shadow-xs' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {isReached ? <Check className="w-4 h-4" /> : idx + 1}
                          </div>
                          <span className={isReached ? 'text-slate-900 font-bold' : 'text-slate-400'}>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Specific Job Details */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-medium">Offered Salary:</span>
                    <p className="font-extrabold text-emerald-600 mt-0.5">₹{formatINR(selectedAppModal.job?.salary)}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-medium">Job Type:</span>
                    <p className="font-bold text-slate-900 mt-0.5">{selectedAppModal.job?.jobType || 'Full-time'}</p>
                  </div>
                </div>

                {/* Cover Note */}
                {selectedAppModal.coverNote && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Submitted Cover Note</label>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 font-medium leading-relaxed">
                      {selectedAppModal.coverNote}
                    </div>
                  </div>
                )}

                {/* Action CTA */}
                <div className="pt-2 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedAppModal(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const id = selectedAppModal.job?._id;
                      setSelectedAppModal(null);
                      if (id) navigate(`/jobs/${id}`);
                    }}
                    className="px-6 py-2.5 text-xs font-bold text-white btn-gradient-brand flex items-center gap-1.5"
                  >
                    Open Job Opening Page
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
};

export default MyApplicationsPage;
