import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  Briefcase,
  ArrowRight,
  Loader2,
  Target,
  FileCheck,
  Bot
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import PasswordStrength from '../components/common/PasswordStrength';

// Signup page
const authImagePrimary = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop";
const authImageFallback = "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop";

const SignupPage = () => {
  const { register, getDashboardPath } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('jobseeker'); // 'jobseeker' or 'recruiter'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imgSrc, setImgSrc] = useState(authImagePrimary);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    const result = await register({
      name,
      email,
      password,
      role,
      phone,
      location,
    });
    setIsSubmitting(false);

    if (result?.success) {
      const targetPath = getDashboardPath(result.role);
      navigate(targetPath, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full bg-[#12182A] border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">

          {/* LEFT SIDE - VISUAL SHOWCASE */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0B1020] via-[#161D33] to-[#1E1B4B] p-8 sm:p-12 relative flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/60">

            {/* Glowing Ambient Decorative Shapes */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-600/25 rounded-full blur-[120px] pointer-events-none"
            />

            {/* Top Brand Tag */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-indigo-300">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Build Your Dream Career</span>
              </div>
            </div>

            {/* Center Image Container with Layered Blobs & Floating UI Cards */}
            <div className="relative z-10 my-6 flex items-center justify-center">

              {/* Decorative blob outline behind image */}
              <div className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full bg-gradient-to-tr from-purple-500/20 via-indigo-500/20 to-coral-500/10 blur-xl -z-10" />

              {/* Main Professional Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl max-w-sm sm:max-w-md"
              >
                <img
                  src={imgSrc}
                  alt="Career team collaboration"
                  loading="eager"
                  onError={() => setImgSrc(authImageFallback)}
                  className="w-full h-[260px] sm:h-[320px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/80 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Element 1: 94% ATS Match */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-2 sm:left-4 bg-[#12182A]/90 backdrop-blur-md border border-indigo-500/30 p-3 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Optimization</p>
                  <p className="text-xs font-black text-white">94% ATS Match</p>
                </div>
              </motion.div>

              {/* Floating Element 2: 12 Jobs Matched */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -right-2 sm:right-4 bg-[#12182A]/90 backdrop-blur-md border border-indigo-500/30 p-3 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Opportunity</p>
                  <p className="text-xs font-black text-white">12 Jobs Matched</p>
                </div>
              </motion.div>

              {/* Floating Element 3: Resume Ready */}
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -right-6 hidden sm:flex bg-[#12182A]/90 backdrop-blur-md border border-purple-500/30 p-2.5 rounded-xl shadow-xl items-center gap-2"
              >
                <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center">
                  <FileCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-purple-200">Resume Ready</span>
              </motion.div>

              {/* Floating Element 4: AI Career Insights */}
              <motion.div
                animate={{ x: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute bottom-1/3 -left-6 hidden sm:flex bg-[#12182A]/90 backdrop-blur-md border border-rose-500/30 p-2.5 rounded-xl shadow-xl items-center gap-2"
              >
                <div className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-200">AI Insights</span>
              </motion.div>
            </div>

            {/* Bottom Testimonial / Tagline */}
            <div className="relative z-10 pt-2">
              <p className="text-xs text-indigo-200/80 font-medium italic">
                "Join thousands of professionals getting hired faster with CareerForge intelligent job matching."
              </p>
            </div>

          </div>

          {/* RIGHT SIDE - CLEAN SIGNUP FORM */}
          <div className="lg:col-span-6 bg-white p-8 sm:p-12 flex flex-col justify-center text-slate-900 relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md w-full mx-auto space-y-5"
            >

              {/* Header & Logo */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                    CF
                  </div>
                  <span className="text-lg font-black tracking-tight text-slate-900">
                    Career<span className="text-indigo-600">Forge</span>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Create your Career Profile
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Build your resume and discover better opportunities.
                </p>
              </div>

              {/* Role Switcher Tabs */}
              <div className="p-1 bg-slate-100 rounded-2xl grid grid-cols-2 gap-1 border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setRole('jobseeker')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    role === 'jobseeker'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  Job Seeker
                </button>
                <button
                  type="button"
                  onClick={() => setRole('recruiter')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    role === 'recruiter'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  Recruiter / Employer
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">Email address *</label>
                    {email && (
                      <span className={`text-[10px] font-semibold ${/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '✓ Valid Email' : 'Invalid email format'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 transition-all outline-none ${
                        !email
                          ? 'border-slate-200 focus:border-[#5B4BFF] focus:bg-white'
                          : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                          ? 'border-emerald-500 bg-emerald-50/20 focus:border-emerald-600'
                          : 'border-rose-400 bg-rose-50/20 focus:border-rose-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Password *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#5B4BFF] focus:bg-white rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 transition-all outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Confirm Password *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#5B4BFF] focus:bg-white rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Strength Indicator */}
                <PasswordStrength password={password} />

                {/* Phone & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 transition-all outline-none"
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
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Bangalore, IN"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Primary CTA */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer mt-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Navigation Switch to Login */}
              <div className="pt-3 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-600 font-medium">
                  Already have an account?{' '}
                  <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                    Sign in →
                  </Link>
                </p>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignupPage;
