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
  Trash2,
  ArrowRight,
  Clock,
  Building
} from 'lucide-react';
import { motion } from 'framer-motion';

const savedJobImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
];

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
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Saved Jobs</h1>
              <Bookmark className="w-5 h-5 text-[#5B4BFF] fill-[#5B4BFF]" />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Review and manage job positions you bookmarked for later application
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-[#5B4BFF]/10 text-[#5B4BFF] border border-[#5B4BFF]/20">
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
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-8 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#5B4BFF]/10 border border-[#5B4BFF]/20 flex items-center justify-center text-[#5B4BFF] mx-auto">
              <Bookmark className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900">No saved jobs yet</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium">
                Save jobs you're interested in and they will appear here.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white btn-gradient-brand"
              >
                Browse Open Jobs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Saved Jobs Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, idx) => {
              const cardImage = savedJobImages[idx % savedJobImages.length];
              return (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white border border-slate-200/90 rounded-3xl p-5 hover:-translate-y-1.5 hover:shadow-soft-lg hover:border-[#5B4BFF]/30 transition-all duration-300 shadow-soft-sm flex flex-col justify-between group overflow-hidden"
                >
                  <div>
                    {/* Large 16:9 Visual Image Header */}
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-slate-100">
                      <img
                        src={cardImage}
                        alt={job.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = savedJobImages[0];
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                      {/* Company Logo Overlay */}
                      <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md text-[#5B4BFF] border border-white/40 flex items-center justify-center font-extrabold text-sm shadow-md">
                        {job.companyLogo || job.company.charAt(0)}
                      </div>

                      {/* Job Type Overlay */}
                      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                        {job.jobType}
                      </div>

                      {/* Location Overlay Tag */}
                      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 text-[11px] font-semibold text-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-lg bg-black/30 border border-white/10">
                        <MapPin className="w-3 h-3 text-teal-400" />
                        <span className="truncate max-w-[180px]">{job.location}</span>
                      </div>
                    </div>

                    {/* Title & Company */}
                    <h3
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="text-base font-extrabold text-slate-900 hover:text-[#5B4BFF] cursor-pointer transition-colors line-clamp-1 mb-1"
                    >
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mb-3 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" /> {job.company}
                    </p>

                    {/* Salary & Saved Date */}
                    <div className="space-y-2 text-xs text-slate-600 mb-5">
                      <div className="flex items-center justify-between font-bold text-slate-900 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-slate-500 font-medium">Salary Range:</span>
                        <div className="flex items-center gap-0.5 text-emerald-600 font-extrabold">
                          <span>₹</span>
                          <span>{formatINR(job.salary)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 text-[11px] px-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Saved: {new Date(job.savedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="flex-1 py-2.5 text-center text-xs font-bold text-white btn-gradient-brand flex items-center justify-center gap-1 cursor-pointer"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => handleRemoveSaved(job._id, job.title)}
                      className="p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-all cursor-pointer"
                      title="Remove from Saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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

export default SavedJobsPage;
