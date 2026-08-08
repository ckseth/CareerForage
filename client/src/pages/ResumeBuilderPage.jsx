import React, { useState, useEffect, useRef } from 'react';
import { fetchMyResumes, saveResume, analyzeResumeData } from '../services/jobService';
import { parseResumeText } from '../utils/resumeParser';
import { ClassicTemplate, ModernTemplate, MinimalTemplate } from '../components/resume/ResumeTemplates';
import ExportModal from '../components/resume/ExportModal';
import TemplateGalleryModal from '../components/resume/TemplateGalleryModal';
import ResumeNavDrawer from '../components/resume/ResumeNavDrawer';
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
  Layout,
  Check,
  Globe,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Menu,
  Target,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeBuilderPage = () => {
  const previewRef = useRef();
  const fileInputRef = useRef();
  const profileImgInputRef = useRef();

  // Profile Picture Upload Handler
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid JPG, JPEG, or PNG image');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      handlePersonalChange('profileImage', event.target.result);
      toast.success('Profile picture updated successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveProfilePicture = () => {
    handlePersonalChange('profileImage', '');
    toast.success('Profile picture removed');
  };

  // Navigation Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Active Form Tab: 'personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications'
  const [activeSection, setActiveSection] = useState('personal');

  // Selected Template: 'modern', 'classic', 'minimal'
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  // Modals & Zoom
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [atsModalOpen, setAtsModalOpen] = useState(false);
  const [fullscreenPreview, setFullscreenPreview] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Loading & Saving states
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [resumeId, setResumeId] = useState(null);

  // Resume State Data
  const [formData, setFormData] = useState({
    personalDetails: {
      name: 'Chhavi Kumari',
      email: 'kumarichhavi60@gmail.com',
      phone: '+91 6204022479',
      address: 'Kharar, India',
      linkedin: 'linkedin.com/in/chhavikumari',
      github: 'github.com/chhavikumari',
      profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    },
    summary: 'Proactive Full Stack Developer with hands-on experience building responsive MERN stack web applications and REST APIs.',
    education: [
      { degree: 'B.Tech in Computer Science', college: 'Apex Institute of Technology', year: '2021 – 2025', cgpa: '8.8 / 10' },
    ],
    experience: [
      { company: 'TechCorp Solutions', role: 'Software Engineering Intern', startDate: 'Jun 2024', endDate: 'Present', description: 'Architected responsive React.js UI components and optimized Express.js REST API endpoints with MongoDB.' },
    ],
    skills: {
      technical: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Tailwind CSS', 'Git'],
      soft: ['Problem Solving', 'Team Collaboration', 'Agile Workflows'],
    },
    projects: [
      { name: 'CareerForge Smart Platform', description: 'AI-driven job matching and ATS resume builder application.', technologies: 'React, Node.js, Express, MongoDB', link: 'github.com/chhavikumari/careerforge', startDate: '2024', endDate: '2024' },
    ],
    certifications: [
      { title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
    ],
    achievements: [],
    atsScore: 92,
  });

  // Load existing resume from backend on mount
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
            name: r.personalDetails?.name || 'Chhavi Kumari',
            email: r.personalDetails?.email || 'kumarichhavi60@gmail.com',
            phone: r.personalDetails?.phone || '+91 6204022479',
            address: r.personalDetails?.address || 'Kharar, India',
            linkedin: r.personalDetails?.linkedin || '',
            github: r.personalDetails?.github || '',
            profileImage: r.personalDetails?.profileImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
          },
          summary: r.summary || 'Proactive Full Stack Developer with hands-on experience building responsive MERN stack web applications.',
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

  // Upload file parser handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const parsed = parseResumeText(text);
      setFormData((prev) => ({
        ...prev,
        ...parsed,
      }));
      toast.success('Resume data extracted! Check pre-filled details below.');
    };
    reader.readAsText(file);
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

  // Tab section list
  const sectionTabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
  ];

  // Selected Template Renderer helper
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

  const scrollToEditor = () => {
    const editorElem = document.getElementById('resume-editor-section');
    if (editorElem) {
      editorElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101828] font-sans selection:bg-[#4169FF] selection:text-white">

      {/* TOP STICKY TOOLBAR (Compact & Minimal) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E4E7EC] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        
        {/* LEFT: Hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 rounded-xl text-slate-600 hover:text-[#4169FF] hover:bg-slate-100 transition-all cursor-pointer flex items-center gap-2 font-bold text-xs"
            title="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 text-[#4169FF]" />
            <span className="hidden sm:inline font-extrabold text-slate-900">CareerForge</span>
          </button>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="text-xs font-extrabold text-slate-700">Resume Builder</span>
        </div>

        {/* CENTER: Resume Name */}
        <div className="hidden md:flex items-center gap-2">
          <input
            type="text"
            value={`${formData.personalDetails.name || 'Candidate'}'s Professional Resume`}
            onChange={(e) => {}}
            className="bg-transparent text-xs font-bold text-slate-900 text-center border-b border-transparent hover:border-slate-300 focus:border-[#4169FF] px-2 py-0.5 outline-none transition-all"
          />
        </div>

        {/* RIGHT: ATS Badge, Save, Preview & Download */}
        <div className="flex items-center gap-2.5">
          {/* Compact ATS Score Popover Trigger */}
          <button
            onClick={() => setAtsModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer hover:bg-emerald-100 transition-all"
          >
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span>ATS {formData.atsScore}%</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveResume}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4169FF]" />
                Saving...
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Save
              </>
            )}
          </button>

          {/* Download PDF Trigger */}
          <button
            onClick={() => setExportModalOpen(true)}
            className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#4169FF] to-[#6C4CF6] hover:opacity-95 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </button>
        </div>
      </header>

      {/* PART 1 — PREMIUM INTRO / VISUAL HEADER */}
      <section className="relative pt-8 pb-16 overflow-hidden bg-gradient-to-b from-white via-[#F7F9FC] to-[#F7F9FC]">
        
        {/* Soft Background Decorative Blobs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#4169FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-5 right-10 w-96 h-96 bg-[#6C4CF6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4169FF]/10 border border-[#4169FF]/20">
                <Sparkles className="w-4 h-4 text-[#4169FF]" />
                <span className="text-xs font-bold text-[#4169FF] uppercase tracking-wider">
                  Live Interactive A4 Editor
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#101828] tracking-tight leading-[1.15]">
                Build a Resume That <br />
                <span className="bg-gradient-to-r from-[#4169FF] via-[#6C4CF6] to-[#4169FF] bg-clip-text text-transparent">
                  Gets You Noticed
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#667085] font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Create a professional, ATS-friendly resume with a live preview as you build. Optimized for HR screeners & candidate callbacks.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={scrollToEditor}
                  className="w-full sm:w-auto px-8 py-4 text-xs font-bold text-white bg-gradient-to-r from-[#4169FF] to-[#6C4CF6] hover:opacity-95 rounded-xl shadow-lg shadow-[#4169FF]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Create My Resume
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* File Upload parser */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".txt,.pdf,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto px-8 py-4 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-[#4169FF]" />
                  Upload Existing Resume
                </button>
              </div>

              {/* Features Micro List */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs font-bold text-[#667085]">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ATS Optimized</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-Time Preview</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> High Res PDF</span>
              </div>
            </div>

            {/* Right Hero A4 Visual Showcase */}
            <div className="lg:col-span-6 relative">
              
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative mx-auto max-w-lg lg:max-w-none"
              >
                {/* A4 Realistic Mockup Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative z-10">
                  
                  {/* Header Mock */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={formData.personalDetails.profileImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"}
                        alt="Candidate Profile"
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-[#4169FF]/30 shadow-sm"
                      />
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-lg">Chhavi Kumari</h3>
                        <p className="text-xs text-[#4169FF] font-bold">Full Stack MERN Developer</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
                      ✓ Recruiter Ready
                    </span>
                  </div>

                  {/* Skills Mock */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Key Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Tailwind CSS'].map((sk, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-[#4169FF]/10 text-[#4169FF] font-bold text-[11px]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience Mock */}
                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Experience</p>
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-extrabold text-xs text-slate-900">TECHCORP SOLUTIONS</span>
                        <span className="text-[10px] text-slate-500 font-semibold">2024 – Present</span>
                      </div>
                      <p className="text-[11px] font-bold text-[#4169FF]">Software Engineering Intern</p>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        Architected responsive React.js UI components and optimized Express.js REST API endpoints...
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating SaaS Badge 1: 98% ATS Match */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-4 sm:-right-6 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xl z-20 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-black text-sm flex items-center justify-center border border-emerald-100">
                    98%
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900">98% ATS Match</p>
                    <p className="text-[10px] text-emerald-600 font-bold">Passed Screener</p>
                  </div>
                </motion.div>

                {/* Floating SaaS Badge 2: Recruiter Ready */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-6 -left-4 sm:-left-6 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xl z-20 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#4169FF]/10 text-[#4169FF] font-black text-sm flex items-center justify-center border border-[#4169FF]/20">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900">Recruiter Ready</p>
                    <p className="text-[10px] text-slate-500 font-medium">Standard A4 Layout</p>
                  </div>
                </motion.div>

                {/* Floating SaaS Badge 3: Professional Template */}
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-1/2 -right-8 hidden sm:flex bg-white border border-slate-200 rounded-2xl p-3 shadow-xl z-20 items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                    A4
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-slate-900">Modern Template</p>
                    <p className="text-[9px] text-[#4169FF] font-semibold">100% Vector Quality</p>
                  </div>
                </motion.div>

              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* PART 2 — ACTUAL RESUME EDITOR (Full Width 2-Column Workspace) */}
      <section id="resume-editor-section" className="py-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editor Main Grid: 42% Left Form / 58% Right Sticky Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: DETAIL FORM (lg:col-span-5 -> ~42% width) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Build Your Resume</h2>
              <p className="text-xs text-[#667085] font-medium mt-1">
                Fill in your details and see your resume update instantly.
              </p>
            </div>

            {/* Compact Horizontal Tab Navigation */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
              {sectionTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    activeSection === tab.id
                      ? 'bg-[#4169FF] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* FORM FIELDS (White background #FFFFFF, border #E4E7EC, radius 12px, focus blue) */}
            <div className="space-y-5">

              {/* Personal Section */}
              {activeSection === 'personal' && (
                <div className="space-y-4">
                  {/* Profile Picture Upload Option */}
                  <div className="p-4 bg-slate-50 border border-[#E4E7EC] rounded-2xl space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Profile Picture (JPG, JPEG, PNG)
                    </label>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 border-2 border-[#4169FF]/30 shadow-xs shrink-0 flex items-center justify-center">
                        {formData.personalDetails.profileImage ? (
                          <img
                            src={formData.personalDetails.profileImage}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-8 h-8 text-slate-400" />
                        )}
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <input
                          type="file"
                          ref={profileImgInputRef}
                          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                          onChange={handleProfilePictureUpload}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            type="button"
                            onClick={() => profileImgInputRef.current?.click()}
                            className="px-3.5 py-2 text-xs font-bold text-white bg-[#4169FF] hover:bg-[#3456D9] rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            {formData.personalDetails.profileImage ? 'Change Picture' : 'Upload Picture'}
                          </button>

                          {formData.personalDetails.profileImage && (
                            <button
                              type="button"
                              onClick={handleRemoveProfilePicture}
                              className="px-3.5 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all cursor-pointer"
                            >
                              Remove Picture
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Supports JPG, JPEG, PNG format
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      value={formData.personalDetails.name}
                      onChange={(e) => handlePersonalChange('name', e.target.value)}
                      placeholder="Chhavi Kumari"
                      className="w-full px-4 py-3.5 bg-white border border-[#E4E7EC] focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/20 rounded-xl text-xs font-semibold text-slate-900 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      value={formData.personalDetails.email}
                      onChange={(e) => handlePersonalChange('email', e.target.value)}
                      placeholder="kumarichhavi60@gmail.com"
                      className="w-full px-4 py-3.5 bg-white border border-[#E4E7EC] focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/20 rounded-xl text-xs font-semibold text-slate-900 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.personalDetails.phone}
                        onChange={(e) => handlePersonalChange('phone', e.target.value)}
                        placeholder="+91 6204022479"
                        className="w-full px-4 py-3.5 bg-white border border-[#E4E7EC] focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/20 rounded-xl text-xs font-semibold text-slate-900 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Location</label>
                      <input
                        type="text"
                        value={formData.personalDetails.address}
                        onChange={(e) => handlePersonalChange('address', e.target.value)}
                        placeholder="Kharar, India"
                        className="w-full px-4 py-3.5 bg-white border border-[#E4E7EC] focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/20 rounded-xl text-xs font-semibold text-slate-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Profile Photo Image URL</label>
                    <input
                      type="text"
                      value={formData.personalDetails.profileImage}
                      onChange={(e) => handlePersonalChange('profileImage', e.target.value)}
                      placeholder="https://images.unsplash.com/photo-1573496359142..."
                      className="w-full px-4 py-3.5 bg-white border border-[#E4E7EC] focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/20 rounded-xl text-xs font-semibold text-slate-900 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">LinkedIn URL</label>
                    <input
                      type="text"
                      value={formData.personalDetails.linkedin}
                      onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/chhavikumari"
                      className="w-full px-4 py-3.5 bg-white border border-[#E4E7EC] focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/20 rounded-xl text-xs font-semibold text-slate-900 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">GitHub URL</label>
                    <input
                      type="text"
                      value={formData.personalDetails.github}
                      onChange={(e) => handlePersonalChange('github', e.target.value)}
                      placeholder="github.com/chhavikumari"
                      className="w-full px-4 py-3.5 bg-white border border-[#E4E7EC] focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/20 rounded-xl text-xs font-semibold text-slate-900 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Summary Section */}
              {activeSection === 'summary' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Professional Summary</label>
                  <textarea
                    rows={6}
                    value={formData.summary}
                    onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                    placeholder="Proactive Full Stack Developer with hands-on experience building responsive MERN stack web applications..."
                    className="w-full p-4 bg-white border border-[#E4E7EC] focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/20 rounded-xl text-xs font-semibold text-slate-900 outline-none transition-all leading-relaxed"
                  />
                </div>
              )}

              {/* Experience Section */}
              {activeSection === 'experience' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Work Experience</label>
                    <button
                      onClick={addExperience}
                      className="px-3 py-1.5 text-xs font-bold text-[#4169FF] bg-[#4169FF]/10 rounded-xl hover:bg-[#4169FF]/20 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Job
                    </button>
                  </div>

                  {formData.experience.map((exp, idx) => (
                    <div key={idx} className="p-4 bg-white border border-[#E4E7EC] rounded-2xl space-y-3 relative shadow-xs">
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
                          placeholder="Company Name (TechCorp Solutions)"
                          className="px-3.5 py-3 bg-white border border-[#E4E7EC] focus:border-[#4169FF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                        />
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleExpChange(idx, 'role', e.target.value)}
                          placeholder="Job Title (Software Engineer)"
                          className="px-3.5 py-3 bg-white border border-[#E4E7EC] focus:border-[#4169FF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => handleExpChange(idx, 'startDate', e.target.value)}
                          placeholder="Start Date (Jun 2024)"
                          className="px-3.5 py-3 bg-white border border-[#E4E7EC] focus:border-[#4169FF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                        />
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => handleExpChange(idx, 'endDate', e.target.value)}
                          placeholder="End Date (Present)"
                          className="px-3.5 py-3 bg-white border border-[#E4E7EC] focus:border-[#4169FF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                        />
                      </div>

                      <textarea
                        rows={3}
                        value={exp.description}
                        onChange={(e) => handleExpChange(idx, 'description', e.target.value)}
                        placeholder="Bullet points & quantitative achievements..."
                        className="w-full p-3 bg-white border border-[#E4E7EC] focus:border-[#4169FF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Education Section */}
              {activeSection === 'education' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Education</label>
                    <button
                      onClick={addEducation}
                      className="px-3 py-1.5 text-xs font-bold text-[#4169FF] bg-[#4169FF]/10 rounded-xl hover:bg-[#4169FF]/20 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Education
                    </button>
                  </div>

                  {formData.education.map((edu, idx) => (
                    <div key={idx} className="p-4 bg-white border border-[#E4E7EC] rounded-2xl space-y-3 relative shadow-xs">
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
                        placeholder="Degree (B.Tech in Computer Science)"
                        className="w-full px-3.5 py-3 bg-white border border-[#E4E7EC] focus:border-[#4169FF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={edu.college}
                          onChange={(e) => handleEduChange(idx, 'college', e.target.value)}
                          placeholder="University Name"
                          className="px-3.5 py-3 bg-white border border-[#E4E7EC] focus:border-[#4169FF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                        />
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => handleEduChange(idx, 'year', e.target.value)}
                          placeholder="Graduation Year (2021 – 2025)"
                          className="px-3.5 py-3 bg-white border border-[#E4E7EC] focus:border-[#4169FF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Section */}
              {activeSection === 'skills' && (
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Technical Skills (Comma Separated)</label>
                  <textarea
                    rows={4}
                    value={formData.skills.technical.join(', ')}
                    onChange={(e) => handleSkillsChange('technical', e.target.value)}
                    placeholder="React.js, Node.js, Express.js, MongoDB, JavaScript, Tailwind CSS, Git"
                    className="w-full p-4 bg-white border border-[#E4E7EC] focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/20 rounded-xl text-xs font-semibold text-slate-900 outline-none transition-all"
                  />

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {formData.skills.technical.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-[#4169FF]/10 text-[#4169FF] text-xs font-bold border border-[#4169FF]/20 flex items-center gap-1"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {activeSection === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Projects & Portfolio</label>
                    <button
                      onClick={addProject}
                      className="px-3 py-1.5 text-xs font-bold text-[#4169FF] bg-[#4169FF]/10 rounded-xl hover:bg-[#4169FF]/20 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                  </div>

                  {formData.projects.map((proj, idx) => (
                    <div key={idx} className="p-4 bg-white border border-[#E4E7EC] rounded-2xl space-y-3 relative shadow-xs">
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
                        placeholder="Project Title (CareerForge Smart Platform)"
                        className="w-full px-3.5 py-3 bg-white border border-[#E4E7EC] focus:border-[#4169FF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                      />
                      <input
                        type="text"
                        value={proj.link}
                        onChange={(e) => handleProjectChange(idx, 'link', e.target.value)}
                        placeholder="Project URL (github.com/user/project)"
                        className="w-full px-3.5 py-3 bg-white border border-[#E4E7EC] focus:border-[#4169FF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                      />
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                        placeholder="Project description & key technical details..."
                        className="w-full p-3 bg-white border border-[#E4E7EC] focus:border-[#4169FF] rounded-xl text-xs font-semibold text-slate-900 outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications Section */}
              {activeSection === 'certifications' && (
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Certifications & Badges</label>
                  {formData.certifications.map((c, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white border border-[#E4E7EC] rounded-xl shadow-xs">
                      <input
                        type="text"
                        value={c.title}
                        onChange={(e) => {
                          const updated = [...formData.certifications];
                          updated[idx].title = e.target.value;
                          setFormData((prev) => ({ ...prev, certifications: updated }));
                        }}
                        placeholder="Certification (AWS Cloud)"
                        className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                      />
                      <input
                        type="text"
                        value={c.issuer}
                        onChange={(e) => {
                          const updated = [...formData.certifications];
                          updated[idx].issuer = e.target.value;
                          setFormData((prev) => ({ ...prev, certifications: updated }));
                        }}
                        placeholder="Issuer (Amazon)"
                        className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                      />
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

          {/* RIGHT COLUMN: LARGE STICKY LIVE A4 PREVIEW (lg:col-span-7 -> ~58% width) */}
          <div className="lg:col-span-7 sticky top-[90px] space-y-3">
            
            {/* Minimal Preview Toolbar */}
            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-3 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#4169FF]" /> Live A4 Sheet
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Instant Updates
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Template Selector Button */}
                <button
                  onClick={() => setTemplateModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Layout className="w-3.5 h-3.5 text-[#4169FF]" />
                  Template
                </button>

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

                {/* Fullscreen Modal Toggle */}
                <button
                  onClick={() => setFullscreenPreview(true)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                  title="Fullscreen Preview"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* LARGE REALISTIC PRINTABLE A4 SHEET CONTAINER */}
            <div className="overflow-x-auto pb-4">
              <div
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                className="transition-transform duration-200"
              >
                <div className="w-full max-w-[650px] aspect-[210/297] bg-white shadow-2xl rounded-sm p-8 sm:p-10 border border-slate-200/80 mx-auto font-sans leading-relaxed text-slate-900">
                  {renderSelectedTemplate()}
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* SLIDE-OUT NAVIGATION DRAWER */}
      <ResumeNavDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* FULLSCREEN PREVIEW MODAL */}
      {fullscreenPreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center overflow-y-auto">
          <div className="w-full max-w-5xl flex items-center justify-between text-white mb-4">
            <span className="text-sm font-extrabold flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#4169FF]" /> Printable A4 Resume Fullscreen View
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

      {/* ATS SCORE DETAILS MODAL */}
      {atsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 relative">
            <button
              onClick={() => setAtsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-black text-lg">
                {formData.atsScore}%
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">ATS Compatibility Rating</h3>
                <p className="text-xs text-emerald-600 font-bold">Passed HR Screener Algorithms</p>
              </div>
            </div>
            <div className="space-y-2 text-xs font-semibold text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p className="flex justify-between"><span>Contact Details & Photo:</span> <span className="text-emerald-600 font-bold">100%</span></p>
              <p className="flex justify-between"><span>Key Skills & Tech Stack:</span> <span className="text-emerald-600 font-bold">94%</span></p>
              <p className="flex justify-between"><span>Work Experience Bullet Points:</span> <span className="text-emerald-600 font-bold">90%</span></p>
              <p className="flex justify-between"><span>Standard A4 Typography:</span> <span className="text-emerald-600 font-bold">96%</span></p>
            </div>
            <button
              onClick={() => setAtsModalOpen(false)}
              className="w-full py-3 text-xs font-bold text-white bg-[#4169FF] rounded-xl cursor-pointer"
            >
              Close ATS Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ResumeBuilderPage;
