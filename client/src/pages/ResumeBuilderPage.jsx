import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchMyResumes, saveResume, analyzeResumeData } from '../services/jobService';
import { parseResumeText } from '../utils/resumeParser';
import { ClassicTemplate, ModernTemplate, MinimalTemplate } from '../components/resume/ResumeTemplates';
import ExportModal from '../components/resume/ExportModal';
import TemplateGalleryModal from '../components/resume/TemplateGalleryModal';
import { toast } from 'react-hot-toast';
import {
  FileText,
  Upload,
  Save,
  Download,
  Sparkles,
  User,
  GraduationCap,
  Briefcase,
  Code,
  FolderKanban,
  Award,
  Plus,
  Trash2,
  CheckCircle2,
  Eye,
  Loader2,
  RefreshCw,
  Layers,
  HelpCircle,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Target,
  Layout,
  Check,
  Globe,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeBuilderPage = () => {
  const previewRef = useRef();

  // Active Form Section Tab: 'personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications'
  const [activeSection, setActiveSection] = useState('personal');

  // Selected Template: 'modern', 'classic', 'minimal'
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  // Modals & Zoom States
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [fullscreenPreview, setFullscreenPreview] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Loading & Saving states
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [resumeId, setResumeId] = useState(null);

  // File parse upload state
  const [uploadedText, setUploadedText] = useState('');

  // Resume State Data
  const [formData, setFormData] = useState({
    personalDetails: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
    },
    summary: 'Proactive Full Stack Developer with experience in building scalable React and Node.js applications.',
    education: [
      { degree: 'B.Tech in Computer Science', college: 'Apex University', year: '2020 – 2024', cgpa: '8.8' },
    ],
    experience: [
      { company: 'TechCorp Solutions', role: 'Software Engineering Intern', startDate: 'Jun 2023', endDate: 'Present', description: 'Architected responsive React.js UI components and optimized Express.js REST API endpoints.' },
    ],
    skills: {
      technical: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Tailwind CSS'],
      soft: ['Problem Solving', 'Team Collaboration'],
    },
    projects: [
      { name: 'CareerForge ATS Platform', description: 'Full-stack AI job matching platform built with MERN stack.', technologies: 'React, Node.js, Express, MongoDB', link: 'github.com/candidate/careerforge', startDate: '2024', endDate: '2024' },
    ],
    certifications: [
      { title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2023' },
    ],
    achievements: [],
    atsScore: 92,
  });

  // Load existing resume from backend
  const loadExistingResume = async () => {
    setLoading(true);
    try {
      const res = await fetchMyResumes();
      if (res.success && res.resumes.length > 0) {
        const r = res.resumes[0];
        setResumeId(r._id);
        setSelectedTemplate(r.template || 'modern');

        let techSkills = ['React.js', 'Node.js', 'Express.js', 'MongoDB'];
        let softSkills = ['Problem Solving', 'Teamwork'];

        if (Array.isArray(r.skills)) {
          techSkills = r.skills;
        } else if (r.skills && typeof r.skills === 'object') {
          if (Array.isArray(r.skills.technical)) techSkills = r.skills.technical;
          if (Array.isArray(r.skills.soft)) softSkills = r.skills.soft;
        }

        setFormData({
          personalDetails: {
            name: r.personalDetails?.name || '',
            email: r.personalDetails?.email || '',
            phone: r.personalDetails?.phone || '',
            address: r.personalDetails?.address || '',
            linkedin: r.personalDetails?.linkedin || '',
            github: r.personalDetails?.github || '',
          },
          summary: r.summary || 'Proactive Full Stack Developer with experience in building scalable React and Node.js applications.',
          education: Array.isArray(r.education) && r.education.length > 0
            ? r.education
            : [{ degree: '', college: '', year: '', cgpa: '' }],
          experience: Array.isArray(r.experience) && r.experience.length > 0
            ? r.experience
            : [{ company: '', role: '', startDate: '', endDate: '', description: '' }],
          skills: {
            technical: techSkills,
            soft: softSkills,
          },
          projects: Array.isArray(r.projects) && r.projects.length > 0
            ? r.projects.map((p) => ({
                name: p.name || '',
                description: p.description || '',
                technologies: p.technologies || '',
                link: p.link || '',
                startDate: p.startDate || '',
                endDate: p.endDate || '',
              }))
            : [{ name: '', description: '', technologies: '', link: '', startDate: '', endDate: '' }],
          certifications: Array.isArray(r.certifications) && r.certifications.length > 0
            ? r.certifications
            : [{ title: '', issuer: '', year: '' }],
          achievements: Array.isArray(r.achievements) ? r.achievements : [],
          atsScore: r.atsScore || 92,
        });
      }
    } catch (error) {
      console.error('Failed to load existing resume:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, []);

  // Update Handlers
  const handlePersonalChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [field]: value },
    }));
  };

  const handleEduChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, education: updated }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: '', college: '', year: '', cgpa: '' }],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleExpChange = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', startDate: '', endDate: '', description: '' }],
    }));
  };

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleSkillsChange = (type, valueString) => {
    const arr = valueString.split(',').map((s) => s.trim());
    setFormData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [type]: arr },
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...formData.projects];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '', technologies: '', link: '', startDate: '', endDate: '' }],
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const handleSaveResume = async () => {
    setIsSaving(true);
    try {
      const res = await saveResume({
        _id: resumeId || undefined,
        title: `${formData.personalDetails.name || 'Candidate'}'s Resume`,
        template: selectedTemplate,
        ...formData,
      });

      if (res.success) {
        setResumeId(res.resume._id);
        if (res.analysis?.atsScore) {
          setFormData((prev) => ({ ...prev, atsScore: res.analysis.atsScore }));
        }
        toast.success('Resume saved successfully!');
      }
    } catch (error) {
      toast.error('Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  const triggerPDFDownload = () => {
    window.print();
  };

  // Sections navigation setup
  const sectionsList = [
    { id: 'personal', label: 'Personal Info', icon: User, completed: Boolean(formData.personalDetails.name && formData.personalDetails.email) },
    { id: 'summary', label: 'Summary', icon: FileText, completed: Boolean(formData.summary) },
    { id: 'experience', label: 'Work Experience', icon: Briefcase, completed: formData.experience.length > 0 && Boolean(formData.experience[0].company) },
    { id: 'education', label: 'Education', icon: GraduationCap, completed: formData.education.length > 0 && Boolean(formData.education[0].degree) },
    { id: 'skills', label: 'Skills', icon: Code, completed: (formData.skills.technical?.length || 0) > 0 },
    { id: 'projects', label: 'Projects', icon: FolderKanban, completed: formData.projects.length > 0 && Boolean(formData.projects[0].name) },
    { id: 'certifications', label: 'Certifications', icon: Award, completed: formData.certifications.length > 0 && Boolean(formData.certifications[0].title) },
  ];

  const completedCount = sectionsList.filter((s) => s.completed).length;
  const completionPercentage = Math.round((completedCount / sectionsList.length) * 100);

  // Template Renderer helper
  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return <ClassicTemplate data={formData} />;
      case 'minimal':
        return <MinimalTemplate data={formData} />;
      case 'modern':
      default:
        return <ModernTemplate data={formData} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        
        {/* COMPACT TOP NAVIGATION BAR */}
        <header className="sticky top-0 z-30 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5B4BFF] text-white flex items-center justify-center font-black text-sm shadow-sm">
              CF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">Resume Builder</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5B4BFF]/10 text-[#5B4BFF]">
                  A4 Live Editor
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {formData.personalDetails.name || 'Candidate'}'s Resume • {selectedTemplate.toUpperCase()} Template
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Save Status Indicator */}
            <button
              onClick={handleSaveResume}
              disabled={isSaving}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#5B4BFF]" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Saved ✓
                </>
              )}
            </button>

            {/* ATS Score Badge */}
            <div className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>{formData.atsScore}% ATS Score</span>
            </div>

            {/* Template Selector Modal Trigger */}
            <button
              onClick={() => setTemplateModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#5B4BFF] bg-[#5B4BFF]/10 border border-[#5B4BFF]/20 hover:bg-[#5B4BFF]/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Layout className="w-4 h-4" />
              Templates
            </button>

            {/* Download PDF Trigger */}
            <button
              onClick={() => setExportModalOpen(true)}
              className="px-5 py-2 text-xs font-bold text-white btn-gradient-brand flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </header>

        {/* MAIN 3-COLUMN WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* COLUMN 1: LEFT SECTIONS NAVIGATION & PROGRESS (3 Cols on lg) */}
          <div className="lg:col-span-3 space-y-5">
            
            {/* Completion Progress Widget */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-soft-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-extrabold">
                <span className="text-slate-700">Resume Completion</span>
                <span className="text-[#5B4BFF]">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="bg-gradient-to-r from-[#5B4BFF] to-[#7C5CFC] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {completedCount} of {sectionsList.length} sections completed
              </p>
            </div>

            {/* Vertical Section Nav */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-3 shadow-soft-sm space-y-1">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-2">
                Resume Sections
              </p>
              {sectionsList.map((sec, idx) => {
                const IconComp = sec.icon;
                const isActive = activeSection === sec.id;

                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#5B4BFF] text-white shadow-soft-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] font-bold ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                        0{idx + 1}
                      </span>
                      <IconComp className="w-4 h-4" />
                      <span>{sec.label}</span>
                    </div>

                    {sec.completed ? (
                      <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-emerald-500'}`} />
                    ) : (
                      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white/60' : 'bg-slate-300'}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ATS Score Panel Widget */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-soft-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">ATS Score Panel</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Passed
                </span>
              </div>

              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-[#5B4BFF] border-r-[#5B4BFF] flex flex-col items-center justify-center shadow-xs">
                  <span className="text-2xl font-black text-slate-900">{formData.atsScore}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Out of 100</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] font-semibold text-slate-600">
                <div className="flex items-center justify-between text-slate-700">
                  <span>✓ Contact & Social Links</span>
                  <span className="text-emerald-600 font-bold">100%</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>✓ Skills & Keywords</span>
                  <span className="text-emerald-600 font-bold">92%</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>✓ Standard Formatting</span>
                  <span className="text-emerald-600 font-bold">95%</span>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 2: CENTER FORM EDITOR WORKSPACE (5 Cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-soft-sm space-y-6">

              {/* Personal Information Form */}
              {activeSection === 'personal' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <User className="w-4.5 h-4.5 text-[#5B4BFF]" /> Personal Information
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Enter your primary contact info for hiring screeners
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Full Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={formData.personalDetails.name}
                          onChange={(e) => handlePersonalChange('name', e.target.value)}
                          placeholder="Chhavi Kumari"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#5B4BFF] focus:bg-white rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Email Address *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={formData.personalDetails.email}
                          onChange={(e) => handlePersonalChange('email', e.target.value)}
                          placeholder="chhavi@example.com"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#5B4BFF] focus:bg-white rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone & Location Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Phone Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            value={formData.personalDetails.phone}
                            onChange={(e) => handlePersonalChange('phone', e.target.value)}
                            placeholder="+91 9876543210"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#5B4BFF] focus:bg-white rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Location</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={formData.personalDetails.address}
                            onChange={(e) => handlePersonalChange('address', e.target.value)}
                            placeholder="Chandigarh, IN"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#5B4BFF] focus:bg-white rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* LinkedIn & GitHub */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">LinkedIn Profile URL</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Linkedin className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={formData.personalDetails.linkedin}
                          onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                          placeholder="linkedin.com/in/chhavikumari"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#5B4BFF] focus:bg-white rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">GitHub Profile URL</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Github className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={formData.personalDetails.github}
                          onChange={(e) => handlePersonalChange('github', e.target.value)}
                          placeholder="github.com/chhavikumari"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#5B4BFF] focus:bg-white rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Section Form */}
              {activeSection === 'summary' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4.5 h-4.5 text-[#5B4BFF]" /> Professional Summary
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Write a brief 2-3 sentence overview highlighting your core strengths
                    </p>
                  </div>

                  <textarea
                    rows={6}
                    value={formData.summary}
                    onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                    placeholder="Proactive Full Stack Developer with hands-on experience in building scalable React, Node.js applications..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-[#5B4BFF] focus:bg-white rounded-2xl text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all leading-relaxed"
                  />
                </div>
              )}

              {/* Experience Form */}
              {activeSection === 'experience' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                        <Briefcase className="w-4.5 h-4.5 text-[#5B4BFF]" /> Work Experience
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Add past positions with achievement bullet points
                      </p>
                    </div>
                    <button
                      onClick={addExperience}
                      className="px-3 py-1.5 text-xs font-bold text-[#5B4BFF] bg-[#5B4BFF]/10 rounded-xl hover:bg-[#5B4BFF]/20 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Job
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.experience.map((exp, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3 relative">
                        {formData.experience.length > 1 && (
                          <button
                            onClick={() => removeExperience(idx)}
                            className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExpChange(idx, 'company', e.target.value)}
                            placeholder="Company Name (e.g. Stripe)"
                            className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#5B4BFF]"
                          />
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => handleExpChange(idx, 'role', e.target.value)}
                            placeholder="Job Title (e.g. Frontend Engineer)"
                            className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#5B4BFF]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => handleExpChange(idx, 'startDate', e.target.value)}
                            placeholder="Start Date (Jun 2023)"
                            className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#5B4BFF]"
                          />
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => handleExpChange(idx, 'endDate', e.target.value)}
                            placeholder="End Date (Present)"
                            className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#5B4BFF]"
                          />
                        </div>

                        <textarea
                          rows={3}
                          value={exp.description}
                          onChange={(e) => handleExpChange(idx, 'description', e.target.value)}
                          placeholder="Key responsibilities and quantitative achievements..."
                          className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#5B4BFF]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Form */}
              {activeSection === 'education' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                        <GraduationCap className="w-4.5 h-4.5 text-[#5B4BFF]" /> Education
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Add degrees, universities, and graduation years
                      </p>
                    </div>
                    <button
                      onClick={addEducation}
                      className="px-3 py-1.5 text-xs font-bold text-[#5B4BFF] bg-[#5B4BFF]/10 rounded-xl hover:bg-[#5B4BFF]/20 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Degree
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.education.map((edu, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3 relative">
                        {formData.education.length > 1 && (
                          <button
                            onClick={() => removeEducation(idx)}
                            className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleEduChange(idx, 'degree', e.target.value)}
                          placeholder="Degree / Stream (e.g. B.Tech CS)"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#5B4BFF]"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={edu.college}
                            onChange={(e) => handleEduChange(idx, 'college', e.target.value)}
                            placeholder="College / University Name"
                            className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#5B4BFF]"
                          />
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => handleEduChange(idx, 'year', e.target.value)}
                            placeholder="Graduation Year (2020 - 2024)"
                            className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#5B4BFF]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Form */}
              {activeSection === 'skills' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Code className="w-4.5 h-4.5 text-[#5B4BFF]" /> Skills & Tech Stack
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Enter comma-separated skills to pre-fill ATS keyword tags
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700">Technical Skills (Comma Separated)</label>
                    <textarea
                      rows={3}
                      value={formData.skills.technical.join(', ')}
                      onChange={(e) => handleSkillsChange('technical', e.target.value)}
                      placeholder="React.js, Node.js, Express.js, MongoDB, JavaScript, TypeScript, Tailwind CSS"
                      className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-[#5B4BFF] focus:bg-white rounded-xl text-xs font-semibold text-slate-900 outline-none transition-all"
                    />

                    {/* Skill Pill Display */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {formData.skills.technical.map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-xl bg-[#5B4BFF]/10 text-[#5B4BFF] text-xs font-bold border border-[#5B4BFF]/20 flex items-center gap-1"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Form */}
              {activeSection === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                        <FolderKanban className="w-4.5 h-4.5 text-[#5B4BFF]" /> Projects & Portfolio
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Add key project links and technical descriptions
                      </p>
                    </div>
                    <button
                      onClick={addProject}
                      className="px-3 py-1.5 text-xs font-bold text-[#5B4BFF] bg-[#5B4BFF]/10 rounded-xl hover:bg-[#5B4BFF]/20 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Project
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.projects.map((proj, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3 relative">
                        {formData.projects.length > 1 && (
                          <button
                            onClick={() => removeProject(idx)}
                            className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => handleProjectChange(idx, 'name', e.target.value)}
                          placeholder="Project Title (e.g. CareerForge Platform)"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#5B4BFF]"
                        />
                        <input
                          type="text"
                          value={proj.link}
                          onChange={(e) => handleProjectChange(idx, 'link', e.target.value)}
                          placeholder="Project URL (e.g. github.com/user/project)"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#5B4BFF]"
                        />
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                          placeholder="Brief project description & features..."
                          className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#5B4BFF]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications Form */}
              {activeSection === 'certifications' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Award className="w-4.5 h-4.5 text-[#5B4BFF]" /> Certifications & Badges
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Include professional credentials and certifications
                    </p>
                  </div>

                  <div className="space-y-3">
                    {formData.certifications.map((c, idx) => (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <input
                          type="text"
                          value={c.title}
                          onChange={(e) => {
                            const updated = [...formData.certifications];
                            updated[idx].title = e.target.value;
                            setFormData((prev) => ({ ...prev, certifications: updated }));
                          }}
                          placeholder="Certification Title (AWS Cloud)"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                        />
                        <input
                          type="text"
                          value={c.issuer}
                          onChange={(e) => {
                            const updated = [...formData.certifications];
                            updated[idx].issuer = e.target.value;
                            setFormData((prev) => ({ ...prev, certifications: updated }));
                          }}
                          placeholder="Issuing Authority (Amazon)"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* COLUMN 3: RIGHT REALISTIC A4 PAPER DOCUMENT PREVIEW (4 Cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Toolbar Controls */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-soft-sm flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-[#5B4BFF]" /> Live A4 Sheet
              </span>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(75, prev - 10))}
                    className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-bold text-slate-700 px-1">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(125, prev + 10))}
                    className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setFullscreenPreview(true)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                  title="Fullscreen Preview"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* REALISTIC PRINTABLE A4 PAPER CONTAINER */}
            <div className="overflow-x-auto pb-4">
              <div
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                className="transition-transform duration-200"
              >
                <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm p-8 sm:p-10 border border-slate-200/80 mx-auto font-sans leading-relaxed text-slate-900">
                  {renderSelectedTemplate()}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* FULLSCREEN PREVIEW MODAL */}
      {fullscreenPreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center overflow-y-auto">
          <div className="w-full max-w-5xl flex items-center justify-between text-white mb-4">
            <span className="text-sm font-extrabold flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#5B4BFF]" /> Printable A4 Resume Fullscreen View
            </span>
            <button
              onClick={() => setFullscreenPreview(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm p-10 border border-slate-200 font-sans text-slate-900 my-auto">
            {renderSelectedTemplate()}
          </div>
        </div>
      )}

      {/* TEMPLATE GALLERY MODAL */}
      <TemplateGalleryModal
        isOpen={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
        selectedTemplate={selectedTemplate}
        onSelectTemplate={(tmplId) => setSelectedTemplate(tmplId)}
      />

      {/* PDF EXPORT CONFIRMATION MODAL */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        onConfirmDownload={triggerPDFDownload}
        templateName={selectedTemplate.toUpperCase()}
      />
    </DashboardLayout>
  );
};

export default ResumeBuilderPage;
