import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchMyJobs, fetchMyApplications, updateApplicationStatus, deleteJobPosting } from '../services/jobService';
import PostJobModal from '../components/jobs/PostJobModal';
import JobCard from '../components/jobs/JobCard';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import { formatINR } from '../utils/formatters';
import { toast } from 'react-hot-toast';
import {
  PlusCircle,
  Briefcase,
  Users,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Building,
  Sparkles,
  MapPin,
  Clock,
  Trash2,
  ChevronUp,
  ChevronDown,
  Zap,
  PhoneCall,
  Search,
  PenTool,
  Check,
  X,
  MessageSquare,
  ShieldCheck,
  ExternalLink,
  Settings,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [postJobModalOpen, setPostJobModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(0);

  const loadRecruiterData = async () => {
    setLoading(true);
    try {
      const [jobsRes, appsRes] = await Promise.all([
        fetchMyJobs(),
        fetchMyApplications()
      ]);
      if (jobsRes.success) setJobs(jobsRes.jobs || []);
      if (appsRes.success) setApplications(appsRes.applications || []);
    } catch (error) {
      console.error('Failed to load recruiter data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecruiterData();
  }, []);

  // Handle Sub-Route Navigation (Post Job, My Jobs, Applications, Candidates, Company Profile, Settings)
  useEffect(() => {
    const path = location.pathname;
    if (path === '/recruiter/post-job') {
      setPostJobModalOpen(true);
    } else if (path === '/recruiter/jobs') {
      setTimeout(() => {
        const elem = document.getElementById('recruiter-jobs-section');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else if (path === '/recruiter/applications' || path === '/recruiter/candidates') {
      setTimeout(() => {
        const elem = document.getElementById('recruiter-applications-section');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else if (path === '/recruiter/company') {
      setTimeout(() => {
        const elem = document.getElementById('recruiter-company-section');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else if (path === '/recruiter/settings') {
      setTimeout(() => {
        const elem = document.getElementById('recruiter-settings-section');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, [location.pathname]);

  const handleJobCreated = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job opening?')) return;
    try {
      const res = await deleteJobPosting(jobId);
      if (res.success) {
        toast.success('Job posting deleted successfully');
        setJobs((prev) => prev.filter((j) => j._id !== jobId));
      }
    } catch (err) {
      toast.error('Failed to delete job posting');
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      const res = await updateApplicationStatus(appId, newStatus);
      if (res.success) {
        toast.success(`Candidate status updated to "${newStatus}"`);
        setApplications((prev) =>
          prev.map((a) => (a._id === appId ? { ...a, status: newStatus } : a))
        );
        if (selectedCandidate && selectedCandidate._id === appId) {
          setSelectedCandidate((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      toast.error('Failed to update candidate status');
    }
  };

  const accordionItems = [
    {
      title: 'Advanced Job Filters & Smart Matching',
      description: 'Use advanced filters and automated assessments to attract the most relevant candidates tailored to your tech stack.',
    },
    {
      title: 'Smart AI Lead Management',
      description: 'Automatically shortlist top 5% candidates with high ATS resume match scores and candidate response analytics.',
    },
    {
      title: 'Inbound Calls & WhatsApp Alerts',
      description: 'Get instant notifications when high-intent candidates apply or update their availability status.',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10 max-w-7xl mx-auto -mt-2">
        
        {/* TOP ANNOUNCEMENT BANNER */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-rose-600 rounded-2xl p-3 px-6 text-white text-xs font-bold shadow-md flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase">Introducing</span>
            <span>AI Calling Agent! AI calls and shortlists applicants 24/7 — Enjoy 25% off, launch offer live!</span>
          </div>
          <button
            onClick={() => setPostJobModalOpen(true)}
            className="text-amber-200 hover:text-white font-extrabold flex items-center gap-1 underline cursor-pointer"
          >
            Know more →
          </button>
        </div>

        {/* APNA-EMPLOYER STYLE HERO CONTAINER */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-soft-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          
          {/* Left Column — Content & Accordion */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Brand Subtitle */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0A8B67] animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">CareerForge Employer Console</span>
            </div>

            {/* Headline — Reduced font size slightly for visual balance */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
              Get applications from relevant, high-intent candidates
            </h1>

            {/* Feature Accordion */}
            <div className="space-y-4 pt-2">
              {accordionItems.map((item, index) => {
                const isOpen = activeAccordion === index;
                return (
                  <div
                    key={index}
                    className="border-b border-slate-200 pb-3 transition-colors"
                  >
                    <button
                      onClick={() => setActiveAccordion(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between text-left cursor-pointer group"
                    >
                      <h3 className={`text-base font-extrabold transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                        {item.title}
                      </h3>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-slate-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-2 text-xs text-slate-500 font-medium leading-relaxed"
                        >
                          {item.description}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Main CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => setPostJobModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 text-xs font-black text-white bg-[#0A8B67] hover:bg-[#087355] rounded-xl shadow-lg shadow-[#0A8B67]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Post a smart-AI job
              </button>

              <span className="text-xs text-slate-400 font-semibold">
                Free candidate screening included
              </span>
            </div>

          </div>

          {/* Right Column — Deep Blue Hero Graphic Container */}
          <div className="lg:col-span-5 relative">
            <div className="bg-gradient-to-b from-[#0A66C2] to-[#024E96] rounded-3xl p-8 text-white min-h-[380px] flex flex-col justify-center items-center relative overflow-hidden shadow-2xl">
              
              {/* Decorative Circular Background Pattern */}
              <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
                <div className="w-80 h-80 rounded-full border-16 border-white" />
                <div className="w-56 h-56 rounded-full border-16 border-white absolute" />
              </div>

              {/* Floating Job Card (Software Developer Active) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-white text-slate-900 rounded-2xl p-4 shadow-2xl w-full max-w-sm border border-white/40 space-y-1 relative z-10"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-slate-900 text-sm">Software developer</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold">
                  Bengaluru, Karnataka | Posted on Nov 30, 2023
                </p>
              </motion.div>

              {/* Connecting Lightning Node Icon */}
              <div className="my-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
              </div>

              {/* Floating Candidate Match Badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="bg-white text-slate-900 rounded-2xl p-3.5 px-5 shadow-2xl w-full max-w-sm border border-white/40 flex items-center justify-between gap-3 relative z-10"
              >
                <div className="flex items-center -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
                    alt="Candidate Chhavi"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                    alt="Candidate 2"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                    alt="Candidate 3"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#5B4BFF] border-2 border-white font-extrabold text-[10px] flex items-center justify-center">
                    +45k
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-black text-slate-900 text-sm hover:text-[#0A66C2] transition-colors cursor-pointer flex items-center gap-1">
                    45,456 ›
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Database Matches</p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* RECRUITER METRIC CARDS */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">My Active Openings</span>
                <div className="w-10 h-10 rounded-2xl bg-[#0A8B67]/10 text-[#0A8B67] flex items-center justify-center font-bold">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">{jobs.length}</p>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">Live company job postings</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Applicants</span>
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">{applications.length}</p>
                <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> High-intent candidates
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Under Review</span>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">
                  {applications.filter((a) => a.status === 'Under Review').length || 1}
                </p>
                <p className="text-[11px] text-amber-600 font-bold mt-1">Pending ATS screening</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Shortlisted Candidates</span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">
                  {applications.filter((a) => a.status === 'Shortlisted' || a.status === 'Selected').length || 2}
                </p>
                <p className="text-[11px] text-emerald-600 font-bold mt-1">Ready for interview</p>
              </div>
            </div>

          </div>
        )}

        {/* RECRUITER POSTED JOBS GRID */}
        <div id="recruiter-jobs-section" className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Active Company Openings</h3>
              <p className="text-xs text-slate-500 font-medium">Jobs posted by your recruiter account</p>
            </div>
            <button
              onClick={() => setPostJobModalOpen(true)}
              className="text-xs font-bold text-[#0A8B67] hover:text-[#087355] flex items-center gap-1 cursor-pointer"
            >
              + Create Opening
            </button>
          </div>

          {jobs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3">
              <p className="text-xs text-slate-500 font-medium">No job postings created yet.</p>
              <button
                onClick={() => setPostJobModalOpen(true)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0A8B67] rounded-xl cursor-pointer"
              >
                Post Your First Job Opening
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, idx) => (
                <JobCard
                  key={job._id || idx}
                  job={job}
                  index={idx}
                  onDelete={handleDeleteJob}
                  actionText="Manage Opening"
                />
              ))}
            </div>
          )}
        </div>

        {/* CANDIDATE APPLICATIONS STREAM & STATUS PIPELINE */}
        <div id="recruiter-applications-section" className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-soft-sm space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Candidate Applications Queue</h3>
              <p className="text-xs text-slate-500 font-medium">Review submitted candidate resumes and update hiring status</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
              {applications.length} Candidates
            </span>
          </div>

          {applications.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-6">No candidate applications received yet.</p>
          ) : (
            <div className="space-y-3">
              {applications.map((app, idx) => (
                <div
                  key={app._id || idx}
                  className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={app.applicant?.profileImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"}
                      alt={app.applicant?.name || 'Candidate'}
                      className="w-11 h-11 rounded-2xl object-cover border-2 border-indigo-100 shadow-xs"
                    />
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">{app.applicant?.name || 'Chhavi Kumari'}</h4>
                      <p className="text-[11px] text-slate-500 font-semibold">
                        Applied for: <span className="text-[#0A8B67] font-bold">{app.job?.title || 'Job Opening'}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Status Dropdown */}
                    <select
                      value={app.status || 'Applied'}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none cursor-pointer focus:border-[#0A8B67]"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    <button
                      onClick={() => setSelectedCandidate(app)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0A8B67] rounded-xl cursor-pointer"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* COMPANY PROFILE SECTION */}
        <div id="recruiter-company-section" className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-soft-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5B4BFF] flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Recruiter Company Profile</h3>
              <p className="text-xs text-slate-500 font-medium">Global Recruiter Corporate Overview & Verified Partner Badge</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[11px] text-slate-400 font-bold uppercase">Hiring Account Name</span>
              <p className="font-extrabold text-slate-900 text-sm">{user?.name || 'Global Recruiter'}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[11px] text-slate-400 font-bold uppercase">Official Work Email</span>
              <p className="font-extrabold text-[#5B4BFF] text-sm">{user?.email || 'recruiter@careerforge.com'}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[11px] text-slate-400 font-bold uppercase">Corporate Location</span>
              <p className="font-extrabold text-slate-900 text-sm">Bengaluru, Karnataka, India</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[11px] text-slate-400 font-bold uppercase">Verification Status</span>
              <p className="font-extrabold text-emerald-600 text-sm flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified Partner Company
              </p>
            </div>
          </div>
        </div>

        {/* SETTINGS SECTION */}
        <div id="recruiter-settings-section" className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-soft-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#5B4BFF] flex items-center justify-center font-bold">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Recruiter Console Settings</h3>
              <p className="text-xs text-slate-500 font-medium">Notification preferences & ATS screening automation rules</p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-semibold text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Real-time Candidate Application Alerts</h4>
                <p className="text-[11px] text-slate-500 font-medium">Receive instant in-app alerts when high-intent candidates apply</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-extrabold">Active</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Automated Candidate ATS Match Threshold</h4>
                <p className="text-[11px] text-slate-500 font-medium">Highlight candidates with ATS score above 85%</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-extrabold">85% Match</span>
            </div>
          </div>
        </div>

        {/* STICKY BOTTOM RIGHT JOB POST BAR */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setPostJobModalOpen(true)}
            className="px-5 py-3 rounded-full text-xs font-black text-white bg-slate-900 hover:bg-slate-800 shadow-2xl flex items-center gap-2 cursor-pointer border border-slate-700 transition-all hover:scale-105"
          >
            <PenTool className="w-3.5 h-3.5 text-emerald-400" />
            Start your job post ^
          </button>
        </div>

        {/* POST JOB MODAL */}
        <PostJobModal
          isOpen={postJobModalOpen}
          onClose={() => setPostJobModalOpen(false)}
          onJobCreated={handleJobCreated}
        />

        {/* CANDIDATE EVALUATION MODAL */}
        <AnimatePresence>
          {selectedCandidate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-5 relative"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedCandidate.applicant?.profileImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"}
                      alt="Candidate Avatar"
                      className="w-10 h-10 rounded-2xl object-cover border-2 border-indigo-100"
                    />
                    <div>
                      <h3 className="font-black text-slate-900 text-base">{selectedCandidate.applicant?.name || 'Chhavi Kumari'}</h3>
                      <p className="text-xs text-slate-500 font-semibold">{selectedCandidate.applicant?.email || 'seeker@careerforge.com'}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedCandidate(null)} className="p-1 text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <p><strong>Applied Position:</strong> {selectedCandidate.job?.title || 'Senior Developer'}</p>
                  <p><strong>Company:</strong> {selectedCandidate.job?.company || 'Company'}</p>
                  <p><strong>Current Status:</strong> <span className="font-bold text-[#0A8B67]">{selectedCandidate.status}</span></p>
                  {selectedCandidate.coverNote && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 italic">
                      "{selectedCandidate.coverNote}"
                    </div>
                  )}

                  <div className="space-y-1 pt-2">
                    <label className="font-bold text-slate-700 block">Update Hiring Pipeline Status:</label>
                    <div className="flex flex-wrap gap-2">
                      {['Applied', 'Under Review', 'Shortlisted', 'Selected', 'Rejected'].map((st) => (
                        <button
                          key={st}
                          onClick={() => handleStatusChange(selectedCandidate._id, st)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedCandidate.status === st
                              ? 'bg-[#0A8B67] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="px-5 py-2 text-xs font-bold text-white bg-slate-900 rounded-xl"
                  >
                    Done
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

export default RecruiterDashboard;
