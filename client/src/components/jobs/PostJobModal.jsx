import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, Building, MapPin, IndianRupee, Layers, Sparkles, Check } from 'lucide-react';
import { createJobPosting } from '../../services/jobService';
import { toast } from 'react-hot-toast';

const PostJobModal = ({ isOpen, onClose, onJobCreated }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    companyLogo: '',
    location: '',
    jobType: 'Full-time',
    salary: '',
    experience: '2-4 years',
    skills: '',
    description: '',
    requirements: '',
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.salary) {
      toast.error('Please fill in Job Title, Company Name, and Salary');
      return;
    }

    setLoading(true);
    try {
      const skillsArray = formData.skills
        ? formData.skills.split(',').map((s) => s.trim()).filter(Boolean)
        : ['React', 'JavaScript'];

      const requirementsArray = formData.requirements
        ? formData.requirements.split('\n').map((r) => r.trim()).filter(Boolean)
        : ['Strong problem-solving skills', 'Team collaboration'];

      const payload = {
        title: formData.title,
        company: formData.company,
        companyLogo: formData.companyLogo || formData.company.charAt(0).toUpperCase(),
        location: formData.location || 'Remote',
        jobType: formData.jobType,
        salary: formData.salary,
        experience: formData.experience,
        skills: skillsArray,
        requirements: requirementsArray,
        description: formData.description || 'Join our engineering team to build scalable products.',
      };

      const res = await createJobPosting(payload);
      if (res.success) {
        toast.success('Job opening posted successfully & live in Find Jobs!');
        if (onJobCreated) onJobCreated(res.job);
        onClose();
        setFormData({
          title: '',
          company: '',
          companyLogo: '',
          location: '',
          jobType: 'Full-time',
          salary: '',
          experience: '2-4 years',
          skills: '',
          description: '',
          requirements: '',
        });
      }
    } catch (error) {
      console.error('Failed to post job:', error);
      toast.error(error.response?.data?.message || 'Failed to post job opening');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#5B4BFF]" /> Post New Job Opening
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Target top candidates with real-time job listing & ATS match verification
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#5B4BFF] focus:ring-2 focus:ring-[#5B4BFF]/20 rounded-xl text-xs font-semibold text-slate-900 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="e.g. Stripe Global"
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#5B4BFF] focus:ring-2 focus:ring-[#5B4BFF]/20 rounded-xl text-xs font-semibold text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* Logo URL & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Company Logo URL (Optional)</label>
                <input
                  type="url"
                  value={formData.companyLogo}
                  onChange={(e) => handleChange('companyLogo', e.target.value)}
                  placeholder="https://company.com/logo.png"
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#5B4BFF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g. Bengaluru, India (Hybrid)"
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#5B4BFF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* Job Type & Salary (₹) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Job Type</label>
                <select
                  value={formData.jobType}
                  onChange={(e) => handleChange('jobType', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#5B4BFF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Salary Range (₹ INR) *</label>
                <input
                  type="text"
                  required
                  value={formData.salary}
                  onChange={(e) => handleChange('salary', e.target.value)}
                  placeholder="e.g. ₹8,00,000 - ₹12,00,000"
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#5B4BFF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* Experience & Required Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Experience Required</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  placeholder="e.g. 3-5 years"
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#5B4BFF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Required Skills (Comma Separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => handleChange('skills', e.target.value)}
                  placeholder="React, Node.js, Express, MongoDB"
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#5B4BFF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Job Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Detail key responsibilities, role impact, and candidate expectations..."
                className="w-full p-4 bg-white border border-slate-200 focus:border-[#5B4BFF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#5B4BFF] to-[#6C4CF6] hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Posting...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" /> Publish Job Opening
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PostJobModal;
