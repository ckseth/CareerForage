import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Cpu,
  Bookmark,
  Building,
  Users,
  Settings,
  PlusCircle,
  FileCheck,
  FileSpreadsheet,
  PieChart,
  LogOut,
  Bell,
  Search,
  UserCheck,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
          { name: 'Profile', path: '/profile', icon: UserCheck },
          { name: 'Settings', path: '/settings', icon: Settings },
        ];
    }
  };

  const navItems = getSidebarItems();

  const getRoleBadge = () => {
    switch (user?.role) {
      case 'admin':
        return { text: 'System Admin', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'recruiter':
        return { text: 'Recruiter', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'jobseeker':
      default:
        return { text: 'Job Seeker', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    }
  };

  const badge = getRoleBadge();

  return (
    <div className="h-screen bg-[#F7F8FC] text-slate-900 flex flex-col font-sans overflow-hidden">
      
      {/* Mobile Top Navigation */}
      <div className="lg:hidden h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
            CF
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-900">Career<span className="text-indigo-600">Forge</span></span>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-xl border border-slate-200"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex flex-1 relative overflow-hidden h-[calc(100vh-4rem)] lg:h-screen">
        
        {/* Sidebar Backdrop for Mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
          />
        )}

        {/* 100% Fixed Non-Scrolling Left Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 h-full z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 transform transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="flex flex-col h-full overflow-hidden">
            {/* Sidebar Brand Logo */}
            <div className="h-20 px-6 border-b border-slate-200 flex items-center shrink-0">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
                  CF
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-slate-900 leading-none">
                    Career<span className="text-indigo-600">Forge</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">SMART PLATFORM</span>
                </div>
              </Link>
            </div>

            {/* User Role Banner */}
            <div className="px-4 py-3 mx-4 mt-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 truncate">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                  {user?.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-900 truncate">{user?.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium truncate">{user?.email}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border shrink-0 ${badge.color}`}>
                {badge.text}
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-1 overflow-y-auto flex-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#5B4BFF]/10 text-[#5B4BFF] border-r-4 border-[#5B4BFF] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-[#5B4BFF]' : 'text-slate-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Logout */}
          <div className="p-4 border-t border-slate-200 shrink-0">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area — Independently Scrollable */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* Top Console Header Bar */}
          <header className="h-20 bg-white/90 border-b border-slate-200 shrink-0 z-30 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
            
            {/* Global Search Bar */}
            <div className="relative max-w-md w-full hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search jobs, skills, candidates, or applications..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl text-xs text-slate-900 placeholder-slate-400 outline-none transition-all"
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
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="text-xs font-bold text-slate-900">Notifications</h4>
                        <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full">2 New</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
                          <p className="font-bold text-slate-900">Application Status Updated</p>
                          <p className="text-[11px] text-slate-500 font-medium">Senior Frontend Developer application status updated to Shortlisted.</p>
                        </div>
                        <div className="p-2.5 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
                          <p className="font-bold text-slate-900">New Candidate Match</p>
                          <p className="text-[11px] text-slate-500 font-medium">94% match score found for Full-Stack Developer position.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Profile Avatar & Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-bold text-slate-800 hidden md:block">{user?.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 text-xs font-medium space-y-1"
                    >
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-900 truncate">{user?.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigate('/profile');
                          }}
                          className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                        >
                          <UserCheck className="w-3.5 h-3.5 text-slate-400" /> My Profile
                        </button>

                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigate('/settings');
                          }}
                          className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                        >
                          <Settings className="w-3.5 h-3.5 text-slate-400" /> Account Settings
                        </button>
                      </div>
                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2 font-semibold"
                        >
                          <LogOut className="w-3.5 h-3.5 text-rose-500" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </header>

          {/* Main Dashboard Child Page Content — Independently Scrollable */}
          <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
