import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchMyResumes, saveResume, analyzeResumeData } from '../services/jobService';
import { parseResumeText } from '../utils/resumeParser';
import { ClassicTemplate, ModernTemplate, MinimalTemplate } from '../components/resume/ResumeTemplates';
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
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const ResumeBuilderPage = () => {
  const previewRef = useRef();
  
  // Tab Mode: 'form' vs 'upload'
  const [activeMode, setActiveMode] = useState('form');
  
  // Active Form Tab: 'personal', 'education', 'experience', 'skills', 'projects', 'certifications'
  const [activeSection, setActiveSection] = useState('personal');

  // Selected Template: 'modern', 'classic', 'minimal'
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  // Loading & Saving states
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [resumeId, setResumeId] = useState(null);

  // Raw uploaded text for file parser mode
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
    education: [
      { degree: '', college: '', year: '', cgpa: '' },
    ],
    experience: [
      { company: '', role: '', startDate: '', endDate: '', description: '' },
    ],
    skills: {
      technical: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
      soft: ['Problem Solving', 'Team Collaboration'],
    },
    projects: [
      { name: '', description: '', technologies: '', link: '', startDate: '', endDate: '' },
    ],
    certifications: [
      { title: '', issuer: '', year: '' },
    ],
    achievements: [],
    atsScore: 85,
  });

  // Load existing resume from backend on page mount
  const loadExistingResume = async () => {
    setLoading(true);
    try {
      const res = await fetchMyResumes();
      if (res.success && res.resumes.length > 0) {
        const r = res.resumes[0];
        setResumeId(r._id);
        setSelectedTemplate(r.template || 'modern');

        // Normalize skills structure
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
          atsScore: r.atsScore || 88,
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

  // Update Personal Details
  const handlePersonalChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [field]: value },
    }));
  };

  // Education Helpers
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

  // Experience Helpers
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

  // Skills Helpers
  const handleSkillsChange = (type, valueString) => {
    const arr = valueString.split(',').map((s) => s.trim());
    setFormData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [type]: arr },
    }));
  };

  // Projects Helpers
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

  // File Upload Text Parser
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setUploadedText(text);
      const parsed = parseResumeText(text);
      setFormData((prev) => ({
        ...prev,
        ...parsed,
      }));
      toast.success('Resume information extracted! You can edit the parsed fields below.');
      setActiveMode('form');
    };
    reader.readAsText(file);
  };

  const handleRawTextParse = () => {
    if (!uploadedText) return;
    const parsed = parseResumeText(uploadedText);
    setFormData((prev) => ({
      ...prev,
      ...parsed,
    }));
    toast.success('Fields pre-filled from text input!');
    setActiveMode('form');
  };

  // Save Resume to MongoDB
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

  // Download PDF Action
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">ATS Resume Builder</h1>
              <Sparkles className="w-5 h-5 text-[#5B4BFF]" />
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Create, edit, and format professional ATS-friendly resumes with real-time paper preview
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Save Resume Button */}
            <button
              onClick={handleSaveResume}
              disabled={isSaving}
              className="px-5 py-3 text-xs font-bold text-white bg-[#5B4BFF] hover:bg-indigo-700 rounded-2xl shadow-xs transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Resume
            </button>

            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-2xl border border-slate-200 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" /> Download PDF
            </button>
          </div>
        </div>

        {/* Visual Template Selector Thumbnails */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Choose ATS Resume Template</h3>
            <span className="text-xs text-slate-400 font-medium">3 ATS Screened Styles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'modern', name: 'Modern ATS', desc: 'Left accent bar & bold typography', previewImg: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80' },
              { id: 'classic', name: 'Classic Serif', desc: 'Traditional centered header layout', previewImg: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=400&q=80' },
              { id: 'minimal', name: 'Minimal Monochrome', desc: 'Ultra-clean monochrome typography', previewImg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80' },
            ].map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 group ${
                  selectedTemplate === tmpl.id
                    ? 'border-[#5B4BFF] bg-indigo-50/60 ring-2 ring-[#5B4BFF]/20 shadow-sm'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-white">
                  <img src={tmpl.previewImg} alt={tmpl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#5B4BFF] transition-colors">{tmpl.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{tmpl.desc}</p>
                  <span className={`inline-block text-[9px] font-bold mt-1 px-2 py-0.5 rounded-full ${selectedTemplate === tmpl.id ? 'bg-[#5B4BFF] text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {selectedTemplate === tmpl.id ? 'Selected' : 'Select Template'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mode Toggle: Create vs Upload */}
        <div className="p-1.5 bg-slate-100 border border-slate-200 rounded-2xl grid grid-cols-2 max-w-md">
          <button
            onClick={() => setActiveMode('form')}
            className={`py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'form'
                ? 'bg-white text-[#5B4BFF] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" /> 1. Create / Edit Form
          </button>
          <button
            onClick={() => setActiveMode('upload')}
            className={`py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'upload'
                ? 'bg-white text-[#5B4BFF] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-4 h-4" /> 2. Upload & Parse File
          </button>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form / Parser Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {activeMode === 'upload' ? (
              /* Upload Parser Container */
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white">Upload Existing Resume</h3>
                  <p className="text-xs text-slate-400">
                    Upload a text/PDF/DOCX file or paste raw text to auto-fill your contact info, skills, education, and experience.
                  </p>
                </div>

                <div className="border-2 border-dashed border-slate-700 hover:border-brand-500/50 rounded-2xl p-8 text-center space-y-3 bg-slate-950/50 transition-colors">
                  <Upload className="w-10 h-10 text-brand-400 mx-auto" />
                  <div>
                    <p className="text-xs font-bold text-white">Choose resume file to parse</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Supports PDF, DOCX, TXT files</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-file-input"
                  />
                  <label
                    htmlFor="resume-file-input"
                    className="inline-block px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 cursor-pointer"
                  >
                    Select File
                  </label>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold text-slate-300">Or Paste Resume Text directly:</label>
                  <textarea
                    rows={6}
                    value={uploadedText}
                    onChange={(e) => setUploadedText(e.target.value)}
                    placeholder="Paste resume content here..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-500 outline-none"
                  />
                  <button
                    onClick={handleRawTextParse}
                    className="w-full py-3 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-md"
                  >
                    Extract Information & Auto-Fill Form
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive Multi-Section Form */
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
                
                {/* Form Section Navigation Tabs */}
                <div className="flex flex-wrap gap-1.5 border-b border-slate-800 pb-3">
                  {[
                    { id: 'personal', label: 'Personal', icon: User },
                    { id: 'education', label: 'Education', icon: GraduationCap },
                    { id: 'experience', label: 'Experience', icon: Briefcase },
                    { id: 'skills', label: 'Skills', icon: Code },
                    { id: 'projects', label: 'Projects', icon: FolderKanban },
                  ].map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSection(sec.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        activeSection === sec.id
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <sec.icon className="w-3.5 h-3.5" />
                      {sec.label}
                    </button>
                  ))}
                </div>

                {/* 1. Personal Details */}
                {activeSection === 'personal' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white">Personal Contact Details</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-slate-400">Full Name</label>
                        <input
                          type="text"
                          value={formData.personalDetails.name}
                          onChange={(e) => handlePersonalChange('name', e.target.value)}
                          placeholder="Alex Morgan"
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-400">Email Address</label>
                        <input
                          type="email"
                          value={formData.personalDetails.email}
                          onChange={(e) => handlePersonalChange('email', e.target.value)}
                          placeholder="alex@example.com"
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-400">Phone Number</label>
                        <input
                          type="text"
                          value={formData.personalDetails.phone}
                          onChange={(e) => handlePersonalChange('phone', e.target.value)}
                          placeholder="+1 (555) 019-2831"
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-400">Location / Address</label>
                        <input
                          type="text"
                          value={formData.personalDetails.address}
                          onChange={(e) => handlePersonalChange('address', e.target.value)}
                          placeholder="San Francisco, CA"
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-400">LinkedIn URL</label>
                        <input
                          type="text"
                          value={formData.personalDetails.linkedin}
                          onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                          placeholder="https://linkedin.com/in/alex"
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-400">GitHub URL</label>
                        <input
                          type="text"
                          value={formData.personalDetails.github}
                          onChange={(e) => handlePersonalChange('github', e.target.value)}
                          placeholder="https://github.com/alex"
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Education */}
                {activeSection === 'education' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Education History</h3>
                      <button
                        onClick={addEducation}
                        className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add College
                      </button>
                    </div>

                    {formData.education.map((edu, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative">
                        {formData.education.length > 1 && (
                          <button
                            onClick={() => removeEducation(idx)}
                            className="absolute top-3 right-3 text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-medium text-slate-400">Degree</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => handleEduChange(idx, 'degree', e.target.value)}
                              placeholder="B.S. in Computer Science"
                              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-slate-400">College / University</label>
                            <input
                              type="text"
                              value={edu.college}
                              onChange={(e) => handleEduChange(idx, 'college', e.target.value)}
                              placeholder="State Tech University"
                              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-slate-400">Graduation Year</label>
                            <input
                              type="text"
                              value={edu.year}
                              onChange={(e) => handleEduChange(idx, 'year', e.target.value)}
                              placeholder="2020 - 2024"
                              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-slate-400">CGPA / Grade</label>
                            <input
                              type="text"
                              value={edu.cgpa}
                              onChange={(e) => handleEduChange(idx, 'cgpa', e.target.value)}
                              placeholder="3.8 / 4.0"
                              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Experience */}
                {activeSection === 'experience' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Work Experience</h3>
                      <button
                        onClick={addExperience}
                        className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Job
                      </button>
                    </div>

                    {formData.experience.map((exp, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative">
                        {formData.experience.length > 1 && (
                          <button
                            onClick={() => removeExperience(idx)}
                            className="absolute top-3 right-3 text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-medium text-slate-400">Company Name</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => handleExpChange(idx, 'company', e.target.value)}
                              placeholder="TechCorp Labs"
                              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-slate-400">Job Role / Title</label>
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => handleExpChange(idx, 'role', e.target.value)}
                              placeholder="Full-Stack Engineer"
                              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-slate-400">Start Date</label>
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => handleExpChange(idx, 'startDate', e.target.value)}
                              placeholder="Jan 2023"
                              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-slate-400">End Date</label>
                            <input
                              type="text"
                              value={exp.endDate}
                              onChange={(e) => handleExpChange(idx, 'endDate', e.target.value)}
                              placeholder="Present"
                              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] font-medium text-slate-400">Role Description & Achievements</label>
                          <textarea
                            rows={3}
                            value={exp.description}
                            onChange={(e) => handleExpChange(idx, 'description', e.target.value)}
                            placeholder="Architected React interfaces and Express backend REST APIs..."
                            className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. Skills */}
                {activeSection === 'skills' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white">Skills</h3>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-medium text-slate-400">Technical Skills (comma separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(formData.skills?.technical) ? formData.skills.technical.join(', ') : (formData.skills?.technical || '')}
                          onChange={(e) => handleSkillsChange('technical', e.target.value)}
                          placeholder="React.js, Node.js, Express, MongoDB, TypeScript"
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-400">Soft Skills (comma separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(formData.skills?.soft) ? formData.skills.soft.join(', ') : (formData.skills?.soft || '')}
                          onChange={(e) => handleSkillsChange('soft', e.target.value)}
                          placeholder="Problem Solving, Communication, Team Leadership"
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Projects */}
                {activeSection === 'projects' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Projects</h3>
                      <button
                        onClick={addProject}
                        className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Project
                      </button>
                    </div>

                    {formData.projects.map((proj, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative">
                        {formData.projects.length > 1 && (
                          <button
                            onClick={() => removeProject(idx)}
                            className="absolute top-3 right-3 text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-medium text-slate-400">Project Name *</label>
                            <input
                              type="text"
                              value={proj.name}
                              onChange={(e) => handleProjectChange(idx, 'name', e.target.value)}
                              placeholder="CareerForge Portal"
                              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-slate-400">Project Link (Optional)</label>
                            <input
                              type="text"
                              value={proj.link}
                              onChange={(e) => handleProjectChange(idx, 'link', e.target.value)}
                              placeholder="https://github.com/project"
                              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-medium text-slate-400">Start Date</label>
                            <input
                              type="text"
                              value={proj.startDate || ''}
                              onChange={(e) => handleProjectChange(idx, 'startDate', e.target.value)}
                              placeholder="January 2026"
                              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-slate-400">End Date (or 'Present')</label>
                            <input
                              type="text"
                              value={proj.endDate || ''}
                              onChange={(e) => handleProjectChange(idx, 'endDate', e.target.value)}
                              placeholder="Present"
                              className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] font-medium text-slate-400">Technologies Used</label>
                          <input
                            type="text"
                            value={proj.technologies}
                            onChange={(e) => handleProjectChange(idx, 'technologies', e.target.value)}
                            placeholder="React, Express, MongoDB, Tailwind CSS"
                            className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-medium text-slate-400">Description</label>
                          <textarea
                            rows={2}
                            value={proj.description}
                            onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                            placeholder="Built smart ATS candidate screening portal..."
                            className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white outline-none resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Right Live Resume Preview & Template Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Template Selector Controls */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-400" />
                <span className="text-xs font-bold text-white">ATS Template:</span>
              </div>

              <div className="flex items-center gap-2">
                {[
                  { id: 'modern', name: 'Modern' },
                  { id: 'classic', name: 'Classic' },
                  { id: 'minimal', name: 'Minimal' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedTemplate === t.id
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Render Preview Box */}
            <div ref={previewRef} className="print:p-0">
              {selectedTemplate === 'classic' && <ClassicTemplate data={formData} />}
              {selectedTemplate === 'modern' && <ModernTemplate data={formData} />}
              {selectedTemplate === 'minimal' && <MinimalTemplate data={formData} />}
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default ResumeBuilderPage;
