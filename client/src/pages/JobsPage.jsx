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
            {jobs.map((job, idx) => {
              const matches = ['96% Match', '94% Match', '92% Match', '90% Match'];
              const matchBadge = matches[idx % matches.length];
              const cardImages = [
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop",
              ];
              const cardImage = cardImages[idx % cardImages.length];

              return (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white border border-slate-200/90 rounded-3xl p-5 hover:-translate-y-1.5 hover:shadow-soft-lg hover:border-[#5B4BFF]/30 transition-all duration-300 shadow-soft-sm flex flex-col justify-between group overflow-hidden"
                >
                  <div>
                    {/* Large 16:9 Image Area with Hover Zoom */}
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-slate-100">
                      <img
                        src={cardImage}
                        alt={job.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = cardImages[0];
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                      {/* Top Badges: Company Avatar + Save & Match */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md text-[#5B4BFF] border border-white/40 flex items-center justify-center font-extrabold text-sm shadow-md">
                          {job.companyLogo || job.company.charAt(0)}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-900/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <Target className="w-3 h-3 text-emerald-400" /> {matchBadge}
                          </span>
                          <button
                            onClick={(e) => handleToggleSave(e, job._id, job.title)}
                            className="p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-600 hover:text-[#5B4BFF] border border-white/40 shadow-sm transition-all cursor-pointer"
                            title="Save Job"
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Bottom Image Overlay Tag: Location */}
                      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 text-[11px] font-semibold text-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-lg bg-black/30 border border-white/10">
                        <MapPin className="w-3 h-3 text-teal-400" />
                        <span className="truncate max-w-[180px]">{job.location}</span>
                      </div>
                    </div>

                    {/* Job Title & Company */}
                    <h3
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="text-base font-extrabold text-slate-900 hover:text-[#5B4BFF] cursor-pointer transition-colors line-clamp-1 mb-1"
                    >
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mb-3 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" /> {job.company}
                    </p>

                    {/* Quick Badges (Job Type, Exp, Salary) */}
                    <div className="flex flex-wrap items-center gap-2 text-xs mb-4">
                      <span className="px-2.5 py-1 rounded-lg bg-[#5B4BFF]/10 text-[#5B4BFF] font-bold text-[11px]">
                        {job.jobType}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        Exp: {job.experience}
                      </span>
                      <div className="ml-auto font-extrabold text-slate-900 text-xs flex items-center gap-0.5">
                        <span className="text-emerald-600">₹</span>
                        <span>{formatINR(job.salary)}</span>
                      </div>
                    </div>

                    {/* Skills Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {job.skills.slice(0, 4).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100/90 text-[11px] font-semibold text-slate-700 border border-slate-200/60"
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
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="flex-1 py-2.5 text-center text-xs font-bold text-white btn-gradient-brand flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
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

export default JobsPage;
