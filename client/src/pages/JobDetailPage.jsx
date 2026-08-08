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
  DollarSign,
  Clock,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  FileText,
  Award,
  Send,
  Loader2,
  X,
  ShieldCheck,
  Share2
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
          <Loader2 className="w-8 h-8 animate-spin text-brand-500 mb-2" />
        </div>
      </DashboardLayout>
    );
  }

  if (!job) return null;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        
        {/* Back Link */}
        <Link to="/jobs" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Job Catalog
        </Link>

        {/* Header Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 p-0.5 shadow-lg shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-extrabold text-white text-2xl">
                  {job.companyLogo || job.company.charAt(0)}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-extrabold text-white">{job.title}</h1>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    {job.jobType}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-500" /> {job.company}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowApplyModal(true)}
                className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-brand-600/30 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" /> Apply for Position
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 font-medium">Location</span>
              <p className="font-bold text-slate-200 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-400" /> {job.location}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 font-medium">Salary Range</span>
              <p className="font-bold text-emerald-400 flex items-center gap-1">
                <span className="text-emerald-400 font-extrabold text-sm shrink-0">₹</span> {formatINR(job.salary)}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 font-medium">Experience Needed</span>
              <p className="font-bold text-slate-200 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {job.experience}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 font-medium">Job Reference ID</span>
              <p className="font-mono font-bold text-slate-400">{job._id.substring(job._id.length - 8).toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Content Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Description Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Description */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Job Description</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Key Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Key Requirements & Qualifications</h3>
                <div className="space-y-3">
                  {job.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Info Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* ATS Match Score Panel */}
            <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> ATS Compatibility
                </span>
                <span className="text-xs font-extrabold text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  94% Score
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Your profile skills match 5 out of 6 required technical keywords for this role.
              </p>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 w-[94%]" />
              </div>
            </div>

            {/* Required Skills */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 text-xs font-semibold text-slate-300 border border-slate-800 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative"
            >
              <button
                onClick={() => setShowApplyModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold">
                  <Briefcase className="w-3.5 h-3.5" /> Submitting Application
                </div>
                <h2 className="text-xl font-extrabold text-white">Apply for {job.title}</h2>
                <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
              </div>

              <form onSubmit={handleApplySubmit} className="space-y-5">
                
                {/* Select Resume */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-brand-400" /> Select ATS Resume *
                  </label>
                  {resumes.length > 0 ? (
                    <select
                      value={selectedResumeId}
                      onChange={(e) => setSelectedResumeId(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl text-xs font-medium text-white outline-none"
                    >
                      {resumes.map((r) => (
                        <option key={r._id} value={r._id}>
                          {r.title} (ATS Score: {r.atsScore}%)
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400">
                      Default CareerForge Profile Resume will be attached.
                    </div>
                  )}
                </div>

                {/* Cover Note */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Cover Note / Quick Pitch (Optional)</label>
                  <textarea
                    rows={4}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Briefly state why you're a great fit for this position..."
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl text-xs font-medium text-white placeholder-slate-500 outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Confirm & Send Application <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default JobDetailPage;
