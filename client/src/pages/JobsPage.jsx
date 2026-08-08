import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchJobs, toggleSaveJob } from '../services/jobService';
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
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-xs">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No job openings found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
              No positions matched your current search filters. Try adjusting your keywords or clearing location filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, idx) => {
              const matches = ['96% Match', '94% Match', '92% Match', '90% Match'];
              const matchBadge = matches[idx % matches.length];
              return (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200 transition-all duration-200 shadow-xs flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Header Logo & Save */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-base shadow-xs">
                        {job.companyLogo || job.company.charAt(0)}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center gap-1">
                          <Target className="w-3 h-3" /> {matchBadge}
                        </span>
                        <button
                          onClick={(e) => handleToggleSave(e, job._id, job.title)}
                          className="p-1.5 rounded-xl bg-slate-50 text-slate-400 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 transition-all"
                          title="Save Job"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Job Title & Company */}
                    <h3
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="text-base font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors line-clamp-1"
                    >
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mb-4 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" /> {job.company}
                    </p>

                    {/* Details (Location, Salary, Experience) */}
                    <div className="space-y-2 text-xs text-slate-600 mb-5">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <span className="text-emerald-600 font-extrabold text-sm shrink-0">₹</span>
                        <span>{formatINR(job.salary)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Exp: {job.experience} • {job.jobType}</span>
                      </div>
                    </div>

                    {/* Required Skills Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {job.skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-700 border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 4 && (
                        <span className="px-2 py-1 text-[10px] text-slate-400 font-medium">
                          +{job.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={(e) => handleToggleSave(e, job._id, job.title)}
                      className="py-2.5 px-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                    >
                      Save
                    </button>
                    <Link
                      to={`/jobs/${job._id}?apply=true`}
                      className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all"
                    >
                      Apply Now
                    </Link>
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

export default JobsPage;
