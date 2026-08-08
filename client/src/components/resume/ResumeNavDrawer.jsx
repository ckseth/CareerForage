import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  LayoutDashboard,
  Briefcase,
  Bookmark,
  FileText,
  Cpu,
  User,
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const ResumeNavDrawer = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Find Jobs', path: '/jobs', icon: Briefcase },
    { label: 'Saved Jobs', path: '/saved-jobs', icon: Bookmark },
    { label: 'My Applications', path: '/applications', icon: FileText },
    { label: 'Resume Builder', path: '/resume-builder', icon: FileText },
    { label: 'Resume Analyzer', path: '/resume-analyzer', icon: Cpu },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Drawer content */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-6 border-r border-slate-200"
        >
          <div className="space-y-6">
            {/* Header & Close */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4169FF] to-[#6C4CF6] text-white flex items-center justify-center font-black text-base shadow-sm">
                  CF
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base tracking-tight">CareerForge</h3>
                  <p className="text-[11px] text-[#4169FF] font-bold">Smart Career Platform</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                Navigation Menu
              </p>
              {navLinks.map((item) => {
                const IconComp = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#4169FF] text-white shadow-soft-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComp className="w-4.5 h-4.5" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white/80' : 'text-slate-400'}`} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* User Profile & Logout */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="w-9 h-9 rounded-xl bg-[#4169FF]/10 text-[#4169FF] flex items-center justify-center font-bold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-extrabold text-slate-900 truncate">{user?.name || 'User Profile'}</p>
                <p className="text-[11px] text-slate-500 font-medium truncate">{user?.email || 'user@example.com'}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeNavDrawer;
