import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { analyzeResumeData } from '../services/jobService';
import { toast } from 'react-hot-toast';
import {
  Upload,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  TrendingUp,
  Award,
  Layers,
  ArrowRight,
  RefreshCw,
  Search,
  Check,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

const ResumeAnalyzerPage = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [analysisResult, setAnalysisResult] = useState({
    atsScore: 92,
    formattingScore: 95,
    keywordMatchScore: 88,
    skillsScore: 92,
    detectedSkills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'REST APIs', 'Git'],
    missingKeywords: ['Docker', 'AWS', 'GraphQL'],
    improvements: [
      'Add quantitative metrics (e.g. "Increased REST API throughput by 35%")',
      'Include Docker and AWS cloud deployment skills to increase match score for senior roles',
      'Ensure experience dates follow month-year duration formatting',
    ],
  });

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      toast.error('Please paste or upload resume text to analyze');
      return;
    }
    setAnalyzing(true);
    try {
      const res = await analyzeResumeData({
        personalDetails: { name: 'Candidate' },
        skills: { technical: resumeText.split(',').map((s) => s.trim()) },
      });
      if (res.success && res.analysis) {
        setAnalysisResult(res.analysis);
        toast.success('Resume ATS score calculated!');
      }
    } catch (error) {
      toast.error('Failed to analyze resume text');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setResumeText(event.target.result);
      toast.success('Resume content loaded! Click "Calculate ATS Score" below.');
    };
    reader.readAsText(file);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">ATS Resume Analyzer & Matcher</h1>
              <Cpu className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Analyze your resume text against automated HR screening algorithms to maximize interview callbacks
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              AI HR Engine Active
            </span>
          </div>
        </div>

        {/* Upload & Dropzone Area */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-6">
          <div className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-8 text-center space-y-3 bg-slate-50/50 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
              <Upload className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Upload Your Resume</p>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Drag & drop your PDF, DOCX, or TXT file here or browse files
              </p>
            </div>
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="analyzer-file-input"
            />
            <label
              htmlFor="analyzer-file-input"
              className="inline-block px-5 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer shadow-xs transition-all"
            >
              Select Resume File
            </label>
          </div>

          {/* Paste Text Fallback */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">Or Paste Resume Content / Skills Below:</label>
            <textarea
              rows={4}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste full resume text or technical skills (React, Node.js, Express, MongoDB, REST APIs)..."
              className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-xs text-slate-900 placeholder-slate-400 outline-none transition-all"
            />
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {analyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
              Calculate ATS Score & Analyze Resume
            </button>
          </div>
        </div>

        {/* Results Analysis Grid */}
        {analysisResult && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Overall ATS Score Meter Card */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-8 shadow-xs text-center space-y-6">
              <h3 className="text-base font-bold text-slate-900">Overall ATS Pass Score</h3>
              
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border-8 border-slate-100 border-t-blue-600 border-r-blue-600 flex flex-col items-center justify-center shadow-xs">
                  <span className="text-4xl font-black text-slate-900">{analysisResult.atsScore}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Out of 100</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                <CheckCircle2 className="w-4 h-4" /> Ready for HR Screeners
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Format</p>
                  <p className="text-sm font-bold text-slate-900">{analysisResult.formattingScore}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Keywords</p>
                  <p className="text-sm font-bold text-slate-900">{analysisResult.keywordMatchScore}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Skills</p>
                  <p className="text-sm font-bold text-slate-900">{analysisResult.skillsScore}%</p>
                </div>
              </div>
            </div>

            {/* Right: Detected Skills & Missing Keywords */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Detected Skills */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Detected Technical Skills
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {analysisResult.detectedSkills.map((sk, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      ✓ {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Recommended Keywords To Add
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {analysisResult.missingKeywords.map((kw, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actionable Suggestions Checklist */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" /> Optimization Checklist
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  {analysisResult.improvements.map((imp, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="leading-relaxed font-medium">{imp}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default ResumeAnalyzerPage;
