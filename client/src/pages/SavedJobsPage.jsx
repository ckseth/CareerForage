import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchSavedJobs, removeSavedJob } from '../services/jobService';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import { formatINR } from '../utils/formatters';
import { toast } from 'react-hot-toast';
import {
  Bookmark,
  MapPin,
  Briefcase,
  DollarSign,
  Trash2,
  ArrowRight,
  Clock,
  Building,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const SavedJobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSavedJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchSavedJobs();
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error('Failed to load saved jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const handleRemoveSaved = async (jobId, title) => {
    try {
      const res = await removeSavedJob(jobId);
      if (res.success) {
        setJobs((prev) => prev.filter((j) => j._id !== jobId));
        toast.success(`Removed "${title}" from saved jobs`);
      }
    } catch (error) {
      toast.error('Failed to remove saved job');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Saved Jobs</h1>
              <Bookmark className="w-5 h-5 text-brand-400 fill-brand-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Review and manage job positions you bookmarked for later application
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
              {jobs.length} Bookmarked Openings
            </span>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : jobs.length === 0 ? (
          /* Empty State */
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mx-auto">
              <Bookmark className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white">No saved jobs yet</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Save jobs you're interested in and they will appear here.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-600/30 transition-all"
              >
                Browse Open Jobs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Saved Jobs Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 p-0.5 shadow-md">
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-extrabold text-white text-base">
                        {job.companyLogo || job.company.charAt(0)}
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                      {job.jobType}
                    </span>
                  </div>

                  <h3
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="text-base font-bold text-white hover:text-brand-400 cursor-pointer transition-colors line-clamp-1"
                  >
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mb-4 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-500" /> {job.company}
                  </p>

                  <div className="space-y-2 text-xs text-slate-300 mb-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-slate-200">
                      <span className="text-emerald-400 font-extrabold text-sm shrink-0">₹</span>
                      <span>{formatINR(job.salary)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      <span>Saved: {new Date(job.savedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <Link
                    to={`/jobs/${job._id}`}
                    className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-md transition-all"
                  >
                    View Job
                  </Link>

                  <button
                    onClick={() => handleRemoveSaved(job._id, job.title)}
                    className="p-2.5 rounded-xl bg-slate-950 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/20 transition-all"
                    title="Remove from Saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default SavedJobsPage;
