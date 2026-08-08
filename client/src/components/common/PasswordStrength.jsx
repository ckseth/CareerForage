import React from 'react';
import { Check, X } from 'lucide-react';

const PasswordStrength = ({ password = '' }) => {
  if (!password) return null;

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const score = [hasMinLength, hasUppercase, hasNumber, hasSpecial].filter(Boolean).length;

  let strengthLabel = 'Weak';
  let barColor = 'bg-rose-500';
  let barWidth = 'w-1/3';

  if (score === 4) {
    strengthLabel = 'Strong';
    barColor = 'bg-emerald-500';
    barWidth = 'w-full';
  } else if (score >= 2) {
    strengthLabel = 'Medium';
    barColor = 'bg-amber-500';
    barWidth = 'w-2/3';
  }

  const requirements = [
    { label: '8+ characters', met: hasMinLength },
    { label: 'Uppercase letter', met: hasUppercase },
    { label: 'Number', met: hasNumber },
    { label: 'Special character', met: hasSpecial },
  ];

  return (
    <div className="space-y-2 pt-1">
      {/* Strength Bar & Label */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span className="text-slate-600">Password Strength:</span>
          <span className={`capitalize ${score === 4 ? 'text-emerald-600' : score >= 2 ? 'text-amber-600' : 'text-rose-600'}`}>
            {strengthLabel}
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div className={`h-full ${barColor} ${barWidth} transition-all duration-300 rounded-full`} />
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-2 gap-1.5 pt-0.5">
        {requirements.map((req, idx) => (
          <div key={idx} className="flex items-center gap-1 text-[10px] font-semibold">
            {req.met ? (
              <Check className="w-3 h-3 text-emerald-500 shrink-0" />
            ) : (
              <X className="w-3 h-3 text-slate-400 shrink-0" />
            )}
            <span className={req.met ? 'text-slate-700' : 'text-slate-400'}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
