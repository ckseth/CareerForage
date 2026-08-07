import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchJobs, toggleSaveJob } from '../services/jobService';
import { CardSkeleton } from '../components/common/SkeletonLoader';
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
  Bookmark
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
  }, [jobType, experience]);

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
      <div className="space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Discover Career Opportunities</h1>
              <Sparkles className="w-5 h-5 text-brand-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Explore verified tech jobs matched with your ATS resume skills
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
              {jobs.length} Available Openings
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Keyword Search */}
            <div className="md:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search job title, skills (React, Node, Python), or company..."
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>

            {/* Location Input */}
            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State or 'Remote'..."
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>

            {/* Search Submit Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" /> Search Jobs
              </button>
            </div>
          </form>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-slate-500" /> Job Type:
            </span>

            {['All', 'Full-time', 'Remote', 'Contract', 'Part-time', 'Internship'].map((type) => (
              <button
                key={type}
                onClick={() => setJobType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  jobType === type
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {type}
              </button>
            ))}

            {(keyword || location || jobType !== 'All' || experience !== 'All') && (
              <button
                onClick={clearFilters}
                className="ml-auto text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1"
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
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No job openings found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No positions matched your current search filters. Try adjusting your keywords or clearing location filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-xs font-bold text-brand-400 bg-brand-500/10 rounded-xl border border-brand-500/20"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-brand-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header Logo & Badges */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 p-0.5 shadow-md">
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-extrabold text-white text-base">
                        {job.companyLogo || job.company.charAt(0)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleToggleSave(e, job._id, job.title)}
                        className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-brand-400 border border-slate-800 hover:border-brand-500/30 transition-all"
                        title="Save Job"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                        {job.jobType}
                      </span>
                    </div>
                  </div>

                  {/* Job Title & Company */}
                  <h3
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="text-base font-bold text-white hover:text-brand-400 cursor-pointer transition-colors line-clamp-1"
                  >
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mb-4">{job.company}</p>

                  {/* Details (Location, Salary, Experience) */}
                  <div className="space-y-2 text-xs text-slate-300 mb-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-slate-200">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>Exp: {job.experience}</span>
                    </div>
                  </div>

                  {/* Required Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {job.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-950 text-[11px] text-slate-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 4 && (
                      <span className="px-2 py-1 text-[10px] text-slate-500">
                        +{job.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <Link
                    to={`/jobs/${job._id}`}
                    className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-1"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/jobs/${job._id}?apply=true`}
                    className="py-2.5 px-4 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-md shadow-brand-600/20 transition-all"
                  >
                    Apply
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default JobsPage;
