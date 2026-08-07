import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Career<span className="text-gradient">Forge</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Empowering global talent and recruiters with AI-driven resume scoring, intelligent job matching, and ATS-friendly tools.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-500/50 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-500/50 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-500/50 transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Job Seekers Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">For Job Seekers</h4>
            <ul className="space-y-2">
              <li><a href="#jobs" className="hover:text-white transition-colors">Browse Jobs</a></li>
              <li><a href="#resume-builder" className="hover:text-white transition-colors">ATS Resume Builder</a></li>
              <li><a href="#analyzer" className="hover:text-white transition-colors">Resume Analyzer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Job Match Score</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career Advice</a></li>
            </ul>
          </div>

          {/* Recruiters Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">For Employers</h4>
            <ul className="space-y-2">
              <li><Link to="/signup" className="hover:text-white transition-colors">Post a Job</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Search Candidates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ATS Tracking System</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recruiter Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise Plans</a></li>
            </ul>
          </div>

          {/* Platform & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white transition-colors">About CareerForge</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CareerForge Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for modern job seekers & recruiters.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
