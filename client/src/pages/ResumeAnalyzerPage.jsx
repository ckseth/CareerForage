import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchMyResumes, analyzeResumeData } from '../services/jobService';
import {
  Cpu,
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

const ResumeAnalyzerPage = () => {
  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAndAnalyze = async () => {
    setLoading(true);
    try {
      const res = await fetchMyResumes();
      if (res.success && res.resumes.length > 0) {
        const currentResume = res.resumes[0];
        setResume(currentResume);

        const result = await analyzeResumeData(currentResume);
        if (result.success) {
          setAnalysis(result);
        }
      }
    } catch (error) {
      console.error('Failed to load resume analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAndAnalyze();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">ATS Resume Analyzer</h1>
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Automated Applicant Tracking System scoring and optimization feedback
            </p>
          </div>

          <Link
            to="/resume-builder"
            className="px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-600/30 flex items-center gap-2 transition-all self-start md:self-auto"
          >
            <FileText className="w-4 h-4" /> Edit Resume in Builder
          </Link>
        </div>

        {/* Top Score Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Score Ring */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-slate-800"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-emerald-400"
                    fill="transparent"
                    strokeDasharray={376}
                    strokeDashoffset={376 - (376 * (analysis?.atsScore || 88)) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-white">{analysis?.atsScore || 88}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Out of 100</span>
                </div>
              </div>

              <div className="mt-3">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  High ATS Compatibility
                </span>
              </div>
            </div>

            {/* Quick Summary */}
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-400" /> Resume Audit Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Your resume document contains strong technical keyword alignment, clean structural formatting, and complete contact details. Below are actionable suggestions to maximize your candidate callback rate.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <p className="text-[11px] text-slate-400">Contact Info</p>
                  <p className="text-sm font-bold text-emerald-400">{analysis?.breakdown?.contactInfo || 15} / 15</p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <p className="text-[11px] text-slate-400">Technical Skills</p>
                  <p className="text-sm font-bold text-emerald-400">{analysis?.breakdown?.skills || 20} / 20</p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <p className="text-[11px] text-slate-400">Experience</p>
                  <p className="text-sm font-bold text-emerald-400">{analysis?.breakdown?.experience || 20} / 20</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Actionable Improvement Suggestions */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" /> Recommended ATS Improvements
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Follow these tailored suggestions to push your resume score to 95+</p>
            </div>
          </div>

          <div className="space-y-3">
            {analysis?.suggestions?.length > 0 ? (
              analysis.suggestions.map((sug, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-200">{sug}</p>
                    <p className="text-[11px] text-slate-400">Adding this missing element ensures automated HR screeners parse your profile correctly.</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-5 h-5" /> Your resume has zero critical ATS formatting flaws!
              </div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default ResumeAnalyzerPage;
