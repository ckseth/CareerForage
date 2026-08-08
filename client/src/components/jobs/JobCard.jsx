import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building, Bookmark, ArrowRight, Target, Trash2 } from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { motion } from 'framer-motion';

const defaultCardImages = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
];

const JobCard = ({
  job = {},
  onSaveToggle,
  isSaved = false,
  onDelete,
  index = 0,
  actionText = "View Details",
  onActionClick
}) => {
  const navigate = useNavigate();

  const cardImage = defaultCardImages[index % defaultCardImages.length];
  const skills = Array.isArray(job.skills) ? job.skills : (job.skills ? job.skills.split(',') : ['React', 'JavaScript']);

  const handleCardClick = () => {
    if (onActionClick) {
      onActionClick(job);
    } else if (job._id) {
      navigate(`/jobs/${job._id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between space-y-4 group relative"
    >
      {/* Top Card Banner Image Container */}
      <div className="w-full h-44 rounded-2xl overflow-hidden relative shrink-0 border border-slate-100">
        <img
          src={cardImage}
          alt={job.title || 'Job Cover'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Top-Left: Company Logo Avatar Badge */}
        <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md text-[#5B4BFF] border border-white/40 flex items-center justify-center font-black text-sm shadow-md">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.parentElement) {
                  e.target.parentElement.innerText = job.company?.charAt(0) || 'C';
                }
              }}
            />
          ) : (
            job.company?.charAt(0) || 'C'
          )}
        </div>

        {/* Top-Right Badges: ATS Match Rating & Bookmark/Delete Button */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-emerald-400 font-extrabold text-[11px] border border-white/10 flex items-center gap-1 shadow-xs">
            <Target className="w-3 h-3 text-emerald-400" />
            {job.atsMatch || 94}% Match
          </span>

          {onDelete ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(job._id);
              }}
              className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md text-slate-500 hover:text-rose-600 border border-white/40 flex items-center justify-center shadow-md transition-colors cursor-pointer"
              title="Delete Job"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : onSaveToggle ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSaveToggle(e, job._id);
              }}
              className={`w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-md transition-colors cursor-pointer ${
                isSaved ? 'text-[#5B4BFF] fill-[#5B4BFF]' : 'text-slate-600 hover:text-[#5B4BFF]'
              }`}
              title="Bookmark Job"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          ) : null}
        </div>

        {/* Bottom-Left: Location Pill Tag */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 text-[11px] font-bold text-white bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <MapPin className="w-3 h-3 text-emerald-400" />
          <span>{job.location || 'Remote'}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        
        <div className="space-y-1.5">
          <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-[#5B4BFF] transition-colors leading-snug line-clamp-1">
            {job.title}
          </h3>
          <p className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-slate-400" /> {job.company}
          </p>
        </div>

        {/* Job Type & Experience Tags + Salary */}
        <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
          <div className="flex items-center gap-1.5">
            <span className="px-3 py-1 rounded-xl bg-indigo-50 text-[#5B4BFF] text-xs font-bold border border-indigo-100">
              {job.jobType || 'Full-time'}
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
              Exp: {job.experience || '2-4 yrs'}
            </span>
          </div>

          <div className="font-black text-slate-900 text-sm tracking-tight text-right">
            <span className="text-emerald-600">₹{formatINR(job.salary)}</span>
          </div>
        </div>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {skills.slice(0, 4).map((sk, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-semibold"
            >
              {typeof sk === 'string' ? sk.trim() : sk}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-2.5 py-1 rounded-xl bg-slate-50 text-slate-400 text-[11px] font-bold">
              +{skills.length - 4} more
            </span>
          )}
        </div>

      </div>

      {/* Bottom CTA Button */}
      <div className="pt-2">
        <button
          onClick={handleCardClick}
          className="w-full py-3 text-xs font-bold text-white bg-[#5B4BFF] hover:bg-[#4E3FE3] rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer group-hover:shadow-lg"
        >
          {actionText} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default JobCard;
