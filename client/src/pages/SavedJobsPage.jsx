import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchSavedJobs, removeSavedJob } from '../services/jobService';
import JobCard from '../components/jobs/JobCard';
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
            {jobs.map((job, idx) => (
              <JobCard
                key={job._id || idx}
                job={job}
                index={idx}
                isSaved={true}
                onSaveToggle={(e, id) => handleRemoveSaved(id, job.title)}
                actionText="View Details"
              />
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default SavedJobsPage;
