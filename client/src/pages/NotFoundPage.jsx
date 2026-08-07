import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { LayoutDashboard, Briefcase, ArrowLeft, Sparkles, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">

          {/* Decorative Gradient Glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-200/40 rounded-full blur-2xl pointer-events-none" />

          {/* Visual Illustration Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-24 h-24 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto shadow-sm"
          >
            <Compass className="w-12 h-12" />
          </motion.div>

          <div className="space-y-2">
            <span className="text-4xl font-black text-indigo-600">404</span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Looks like this page took a career break.
            </h1>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              The page you're looking for doesn't exist, has been renamed, or may have taken a brief leave of absence.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-5 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <LayoutDashboard className="w-4 h-4" /> Back to Dashboard
            </Link>
            <Link
              to="/jobs"
              className="w-full sm:w-auto px-5 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Briefcase className="w-4 h-4 text-indigo-600" /> Explore Jobs
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
