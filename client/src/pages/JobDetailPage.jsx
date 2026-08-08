import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchJobById, fetchMyResumes, submitApplication } from '../services/jobService';
import { useAuth } from '../hooks/useAuth';
import { formatINR } from '../utils/formatters';
import { toast } from 'react-hot-toast';
import {
  MapPin,
  Briefcase,
  Clock,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  FileText,
  Send,
  Loader2,
  X,
  ShieldCheck,
  Share2,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Apply Modal state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadJob = async () => {
    setLoading(true);
    try {
      const data = await fetchJobById(id);
      if (data.success) {
        setJob(data.job);
      }
    } catch (error) {
      toast.error('Job opening not found');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const loadResumes = async () => {
    try {
      const data = await fetchMyResumes();
      if (data.success && data.resumes.length > 0) {
        setResumes(data.resumes);
        setSelectedResumeId(data.resumes[0]._id);
      }
    } catch (error) {
      console.error('Failed to load candidate resumes:', error);
    }
  };

  useEffect(() => {
    loadJob();
    loadResumes();
  }, [id]);

  useEffect(() => {
    if (searchParams.get('apply') === 'true') {
      setShowApplyModal(true);
    }
  }, [searchParams]);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!job) return;

    setIsSubmitting(true);
    try {
      const res = await submitApplication({
        jobId: job._id,
        resumeId: selectedResumeId || undefined,
        coverNote,
      });

      if (res.success) {
        toast.success('Application submitted successfully!');
        setShowApplyModal(false);
        navigate('/applications');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit application.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-[#5B4BFF] mb-2" />
        </div>
      </DashboardLayout>
    );
  }

  if (!job) return null;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        
        {/* Back Link */}
        <Link to="/jobs" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#5B4BFF] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Job Catalog
        </Link>

        {/* Header Card — Clean White Light Surface */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-soft-sm space-y-6 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#5B4BFF] p-0.5 border border-indigo-100 shadow-xs shrink-0 flex items-center justify-center font-black text-2xl">
                {job.companyLogo ? (
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.parentElement) {
                        e.target.parentElement.innerText = job.company?.charAt(0) || 'C';
                      }
                    }}
                  />
                ) : (
                  job.company?.charAt(0) || 'C'
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">{job.title}</h1>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-[#5B4BFF] border border-indigo-100">
                    {job.jobType || 'Full-time'}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-400" /> {job.company}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowApplyModal(true)}
                className="px-6 py-3.5 text-xs font-extrabold text-white bg-[#5B4BFF] hover:bg-[#4E3FE3] rounded-2xl shadow-md hover:shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" /> Apply for Position
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold">Location</span>
              <p className="font-bold text-slate-900 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#5B4BFF]" /> {job.location}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold">Salary Offered</span>
              <p className="font-extrabold text-emerald-600 flex items-center gap-1">
                <span>₹</span> {formatINR(job.salary)}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold">Experience</span>
              <p className="font-bold text-slate-900 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {job.experience || '2-4 years'}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold">Job ID</span>
              <p className="font-mono font-bold text-slate-500">{job._id.substring(job._id.length - 8).toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Content Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Description Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Description */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-soft-sm">
              <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">Job Description</h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Key Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-soft-sm">
                <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">Candidate Requirements</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar Info Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Required Tech Skills */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-soft-sm">
              <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">Required Tech Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills && job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 text-[#5B4BFF] text-xs font-bold border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Company Overview Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-soft-sm">
              <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">About {job.company}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {job.company} is a verified partner recruiter on CareerForge hiring top talent for high-growth technical roles.
              </p>
              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full py-3 text-xs font-bold text-white bg-[#5B4BFF] hover:bg-[#4E3FE3] rounded-xl cursor-pointer transition-all"
              >
                Apply for Position
              </button>
            </div>

          </div>

        </div>

        {/* APPLY FOR POSITION MODAL */}
        <AnimatePresence>
          {showApplyModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Submit Application</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{job.title} at {job.company}</p>
                  </div>
                  <button
                    onClick={() => setShowApplyModal(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  {/* Select Resume */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Select Resume Snapshot</label>
                    {resumes.length > 0 ? (
                      <select
                        value={selectedResumeId}
                        onChange={(e) => setSelectedResumeId(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#5B4BFF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                      >
                        {resumes.map((r) => (
                          <option key={r._id} value={r._id}>
                            {r.title || 'My Resume'} ({new Date(r.updatedAt).toLocaleDateString()})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-xs text-amber-600 font-medium p-3 bg-amber-50 rounded-xl border border-amber-100">
                        Default candidate profile data will be submitted. You can also build an A4 resume in the Resume Builder.
                      </p>
                    )}
                  </div>

                  {/* Cover Note */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Cover Note to Recruiter (Optional)</label>
                    <textarea
                      rows={4}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      placeholder="Briefly explain why your skills and experience make you a great fit for this position..."
                      className="w-full p-4 bg-white border border-slate-200 focus:border-[#5B4BFF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowApplyModal(false)}
                      className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 text-xs font-bold text-white bg-[#5B4BFF] hover:bg-[#4E3FE3] rounded-xl shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Confirm Application
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
};

export default JobDetailPage;
