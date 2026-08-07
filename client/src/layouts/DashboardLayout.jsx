import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Sparkles,
  LayoutDashboard,
  Search,
  Bookmark,
  Briefcase,
  FileText,
  Cpu,
  BarChart3,
  Sparkle,
  FileCheck,
  UserCheck,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  Menu,
  X,
  PlusCircle,
  Users,
  Building,
  Shield,
  FileSpreadsheet,
  PieChart,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Role-specific sidebar navigation configurations
  const getSidebarItems = () => {
    switch (user?.role) {
      case 'recruiter':
        return [
          { name: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
          { name: 'Post Job', path: '/recruiter/post-job', icon: PlusCircle },
          { name: 'My Jobs', path: '/recruiter/jobs', icon: Briefcase },
          { name: 'Applications', path: '/recruiter/applications', icon: FileCheck },
          { name: 'Candidates', path: '/recruiter/candidates', icon: Users },
          { name: 'Company Profile', path: '/recruiter/company', icon: Building },
          { name: 'Settings', path: '/recruiter/settings', icon: Settings },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
          { name: 'Users', path: '/admin/users', icon: Users },
          { name: 'Recruiters', path: '/admin/recruiters', icon: Building },
          { name: 'Jobs', path: '/admin/jobs', icon: Briefcase },
          { name: 'Applications', path: '/admin/applications', icon: FileCheck },
          { name: 'Reports', path: '/admin/reports', icon: FileSpreadsheet },
          { name: 'Analytics', path: '/admin/analytics', icon: PieChart },
          { name: 'Settings', path: '/admin/settings', icon: Settings },
        ];
      case 'jobseeker':
      default:
        return [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'Find Jobs', path: '/jobs', icon: Search },
          { name: 'Saved Jobs', path: '/saved-jobs', icon: Bookmark },
          { name: 'Applications', path: '/applications', icon: Briefcase },
          { name: 'Resume Builder', path: '/resume-builder', icon: FileText },
          { name: 'Resume Analyzer', path: '/resume-analyzer', icon: Cpu },
          { name: 'ATS Score', path: '/ats-score', icon: BarChart3 },
          { name: 'Job Match', path: '/job-match', icon: Sparkle },
          { name: 'Cover Letter', path: '/cover-letter', icon: FileCheck },
          { name: 'Profile', path: '/profile', icon: UserCheck },
          { name: 'Settings', path: '/settings', icon: Settings },
        ];
    }
  };

  const navItems = getSidebarItems();

  const getRoleBadge = () => {
    switch (user?.role) {
      case 'admin':
        return { text: 'Admin', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
      case 'recruiter':
        return { text: 'Recruiter', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
      case 'jobseeker':
      default:
        return { text: 'Job Seeker', color: 'bg-brand-500/10 text-brand-400 border-brand-500/20' };
    }
  };

  const badge = getRoleBadge();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* Mobile Header Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-cyan-500 p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <span className="text-lg font-bold text-white">Career<span className="text-gradient">Forge</span></span>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-slate-950/95 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & Brand Header */}
          <div className="h-20 flex items-center px-6 border-b border-slate-900 justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-brand-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-white tracking-tight">
                  Career<span className="text-gradient">Forge</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-medium tracking-wider -mt-1">
                  Portal Console
                </span>
              </div>
            </Link>
          </div>

          {/* User Role Banner */}
          <div className="px-4 py-3 mx-4 mt-4 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${badge.color}`}>
              {badge.text}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)]">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-600/20 text-white border border-brand-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-slate-900">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20"
          >
            <LogOut className="w-4 h-4 text-slate-500" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Console Bar */}
        <header className="h-20 bg-slate-950/80 border-b border-slate-800/80 sticky top-0 z-30 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
          
          {/* Global Search Bar Placeholder */}
          <div className="relative max-w-md w-full hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search jobs, candidates, keywords, resume skills..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-800 focus:border-brand-500 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4 ml-auto">
            
            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileDropdownOpen(false);
                }}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white relative transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-500" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h4 className="text-xs font-bold text-white">Notifications</h4>
                      <span className="text-[10px] font-medium text-brand-400">2 New</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700">
                        <p className="font-semibold text-slate-200">ATS Resume Analyzed</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Your ATS score was calculated at 94% match.</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700">
                        <p className="font-semibold text-slate-200">Welcome to CareerForge!</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Complete your profile to discover matched jobs.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-3 p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                  {user?.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="hidden sm:block text-left pr-1">
                  <p className="text-xs font-bold text-white leading-tight">{user?.name}</p>
                  <p className="text-[10px] text-slate-400 capitalize leading-tight">{user?.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1"
                  >
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="text-xs font-bold text-white">{user?.name}</p>
                      <p className="text-[11px] text-slate-400">{user?.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      View Profile
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Account Settings
                    </Link>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-8 bg-slate-950 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;
