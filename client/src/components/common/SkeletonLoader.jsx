import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="h-4 bg-slate-800 rounded w-1/3"></div>
      <div className="w-8 h-8 bg-slate-800 rounded-lg"></div>
    </div>
    <div className="h-7 bg-slate-800 rounded w-1/2 mb-2"></div>
    <div className="h-3 bg-slate-800/60 rounded w-3/4"></div>
  </div>
);

export const TableSkeleton = ({ rows = 4 }) => (
  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 animate-pulse space-y-4">
    <div className="h-6 bg-slate-800 rounded w-1/4 mb-4"></div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-slate-800 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-800 rounded w-1/3"></div>
          <div className="h-3 bg-slate-800/60 rounded w-1/2"></div>
        </div>
        <div className="h-6 bg-slate-800 rounded w-20"></div>
      </div>
    ))}
  </div>
);
