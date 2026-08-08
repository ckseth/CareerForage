import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchJobs, toggleSaveJob } from '../services/jobService';
import JobCard from '../components/jobs/JobCard';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import { formatINR } from '../utils/formatters';
import { toast } from 'react-hot-toast';
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Filter,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  X,
  CheckCircle2,
  Bookmark,
  Building,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const JobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [keyword, setKeyword] = useState('');
  const [jobType, setJobType] = useState('All');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('All');

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs({
        keyword: keyword || undefined,
        jobType: jobType !== 'All' ? jobType : undefined,
        location: location || undefined,
        experience: experience !== 'All' ? experience : undefined,
      });
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [jobType]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadJobs();
  };

  const clearFilters = () => {
    setKeyword('');
    setJobType('All');
    setLocation('');
    setExperience('All');
    loadJobs();
  };

  const handleToggleSave = async (e, jobId, title) => {
    e.stopPropagation();
    try {
      const res = await toggleSaveJob(jobId);
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error('Please login as candidate to save jobs');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">

        {/* Page Hero Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
          <div className="space-y-1 relative z-10">
            <h1 className="text-2xl sm:text-3xl font-black">Find Your Next Opportunity</h1>
            <p className="text-xs sm:text-sm text-indigo-100 font-medium max-w-lg">
              Discover jobs matched to your skills, experience, and career goals.
            </p>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <span className="text-xs font-bold px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
              {jobs.length} Available Openings
            </span>
          </div>
        </div>

        {/* Search & Filter Bar Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">

            {/* Keyword Search */}
            <div className="md:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, skills, or company..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl text-xs text-slate-900 placeholder-slate-400 outline-none transition-all"
              />
            </div>

            {/* Location Input */}
            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location / Remote..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl text-xs text-slate-900 placeholder-slate-400 outline-none transition-all"
              />
            </div>

            {/* Search Submit Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" /> Search Jobs
              </button>
            </div>
          </form>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" /> Job Type:
            </span>

            {['All', 'Full-time', 'Remote', 'Contract', 'Part-time', 'Internship'].map((type) => (
              <button
                key={type}
                onClick={() => setJobType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${jobType === type
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-white'
                  }`}
              >
                {type}
              </button>
            ))}

            {(keyword || location || jobType !== 'All' || experience !== 'All') && (
              <button
                onClick={clearFilters}
                className="ml-auto text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Job Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-xs">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No job openings found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
              No positions matched your current search filters. Try adjusting your keywords or clearing location filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-xs font-bold text-[#5B4BFF] bg-[#5B4BFF]/10 rounded-xl border border-[#5B4BFF]/20 hover:bg-[#5B4BFF]/20 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, idx) => (
              <JobCard
                key={job._id || idx}
                job={job}
                index={idx}
                onSaveToggle={handleToggleSave}
                actionText="View Details"
              />
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default JobsPage;
