import React from 'react';

const normalizeSkills = (rawSkills) => {
  if (Array.isArray(rawSkills)) {
    return { technical: rawSkills, soft: [] };
  }
  if (rawSkills && typeof rawSkills === 'object') {
    return {
      technical: Array.isArray(rawSkills.technical) ? rawSkills.technical : [],
      soft: Array.isArray(rawSkills.soft) ? rawSkills.soft : [],
    };
  }
  return { technical: [], soft: [] };
};

const formatDuration = (start, end) => {
  if (!start && !end) return '';
  if (start && end) return `${start} – ${end}`;
  return start || end || '';
};

// ====================================================
// 1. CLASSIC ATS TEMPLATE (Traditional Clean Serif/Sans)
// ====================================================
export const ClassicTemplate = ({ data = {} }) => {
  const pd = data.personalDetails || {};
  const edu = Array.isArray(data.education) ? data.education : [];
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const skills = normalizeSkills(data.skills);
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const certs = Array.isArray(data.certifications) ? data.certifications : [];
  const achs = Array.isArray(data.achievements) ? data.achievements : [];

  return (
    <div className="bg-white text-slate-900 font-serif p-8 sm:p-10 shadow-2xl rounded-sm max-w-2xl mx-auto text-xs space-y-5 leading-relaxed">
      {/* Header */}
      <div className="text-center border-b border-slate-300 pb-4 space-y-1.5">
        <h1 className="text-2xl font-bold text-slate-900 tracking-wide uppercase">{pd.name || 'Candidate Name'}</h1>
        <div className="flex flex-wrap justify-center items-center gap-3 text-[11px] text-slate-600 font-sans">
          {pd.email && <span>{pd.email}</span>}
          {pd.phone && <span>• {pd.phone}</span>}
          {pd.address && <span>• {pd.address}</span>}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3 text-[11px] text-slate-700 font-sans">
          {pd.linkedin && <a href={pd.linkedin} target="_blank" rel="noreferrer" className="underline">LinkedIn</a>}
          {pd.github && <a href={pd.github} target="_blank" rel="noreferrer" className="underline">GitHub</a>}
        </div>
      </div>

      {/* Technical & Professional Skills */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Technical & Professional Skills
          </h2>
          <div className="font-sans text-[11px] text-slate-800 space-y-2.5 leading-relaxed">
            {skills.technical?.length > 0 && (
              <p>
                <strong className="font-bold text-slate-900">Technical Skills: </strong>
                {skills.technical.join(', ')}
              </p>
            )}
            {skills.soft?.length > 0 && (
              <p>
                <strong className="font-bold text-slate-900">Soft Skills: </strong>
                {skills.soft.join(', ')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Professional Experience
          </h2>
          {exp.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{item.role || 'Position'} {item.company ? `— ${item.company}` : ''}</span>
                <span className="font-normal text-slate-600 font-sans">{formatDuration(item.startDate, item.endDate)}</span>
              </div>
              <p className="font-sans text-[11px] text-slate-700 whitespace-pre-line leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Projects
          </h2>
          {projects.map((proj, idx) => {
            const duration = formatDuration(proj.startDate, proj.endDate);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span className="uppercase">{proj.name}</span>
                  {duration && <span className="font-normal text-slate-600 font-sans">{duration}</span>}
                </div>
                <p className="font-sans text-[11px] text-slate-700 leading-relaxed">{proj.description}</p>
                {proj.technologies && (
                  <p className="font-sans text-[11px] text-slate-800">
                    <strong className="font-bold text-slate-900">Technologies: </strong>{proj.technologies}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Education */}
      {edu.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Education
          </h2>
          {edu.map((ed, idx) => (
            <div key={idx} className="flex justify-between text-slate-900">
              <div>
                <p className="font-bold">{ed.degree}</p>
                <p className="font-sans text-[11px] text-slate-600">{ed.college}</p>
              </div>
              <div className="text-right font-sans text-[11px] text-slate-600">
                <p>{ed.year}</p>
                {ed.cgpa && <p>CGPA: {ed.cgpa}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications & Achievements */}
      {(certs.length > 0 || achs.length > 0) && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Certifications & Key Achievements
          </h2>
          <ul className="list-disc list-inside font-sans text-[11px] text-slate-700 space-y-1">
            {certs.map((c, i) => (
              <li key={i}><strong>{c.title}</strong> {c.issuer ? `– ${c.issuer}` : ''} {c.year ? `(${c.year})` : ''}</li>
            ))}
            {achs.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ====================================================
// 2. MODERN ATS TEMPLATE (Accent Colors & Clean Text)
// ====================================================
export const ModernTemplate = ({ data = {} }) => {
  const pd = data.personalDetails || {};
  const edu = Array.isArray(data.education) ? data.education : [];
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const skills = normalizeSkills(data.skills);
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const certs = Array.isArray(data.certifications) ? data.certifications : [];
  const achs = Array.isArray(data.achievements) ? data.achievements : [];

  return (
    <div className="bg-white text-slate-900 font-sans p-8 sm:p-10 shadow-2xl rounded-sm max-w-2xl mx-auto text-xs space-y-6 leading-relaxed">
      {/* Header Banner */}
      <div className="border-l-4 border-indigo-600 pl-4 space-y-2">
        <h1 className="text-2xl font-extrabold text-indigo-950 tracking-tight">{pd.name || 'Candidate Name'}</h1>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
          {pd.email && <span>{pd.email}</span>}
          {pd.phone && <span>• {pd.phone}</span>}
          {pd.address && <span>• {pd.address}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-indigo-600 font-semibold pt-0.5">
          {pd.linkedin && <a href={pd.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>}
          {pd.github && <a href={pd.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>}
        </div>
      </div>

      {/* Technical & Professional Skills */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-100 pb-1">
            Technical & Professional Skills
          </h2>
          <div className="text-[11px] text-slate-800 space-y-2.5 leading-relaxed pt-1">
            {skills.technical?.length > 0 && (
              <p>
                <strong className="font-bold text-slate-900">Technical Skills: </strong>
                {skills.technical.join(', ')}
              </p>
            )}
            {skills.soft?.length > 0 && (
              <p>
                <strong className="font-bold text-slate-900">Soft Skills: </strong>
                {skills.soft.join(', ')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-100 pb-1">
            Work Experience
          </h2>
          {exp.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-xs">{item.role || 'Position'}</span>
                <span className="text-[11px] text-indigo-700 font-semibold">{formatDuration(item.startDate, item.endDate)}</span>
              </div>
              {item.company && <p className="text-[11px] font-semibold text-slate-600">{item.company}</p>}
              <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-line">{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-100 pb-1">
            Projects
          </h2>
          {projects.map((proj, idx) => {
            const duration = formatDuration(proj.startDate, proj.endDate);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 uppercase">{proj.name}</span>
                  {duration && <span className="text-[11px] text-indigo-700 font-semibold">{duration}</span>}
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">{proj.description}</p>
                {proj.technologies && (
                  <p className="text-[11px] text-slate-800">
                    <strong className="font-bold text-slate-900">Technologies: </strong>{proj.technologies}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Education */}
      {edu.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-100 pb-1">
            Education
          </h2>
          {edu.map((ed, idx) => (
            <div key={idx} className="flex justify-between items-baseline">
              <div>
                <p className="font-bold text-slate-900">{ed.degree}</p>
                <p className="text-[11px] text-slate-600">{ed.college}</p>
              </div>
              <div className="text-right text-[11px] text-slate-600">
                <p>{ed.year}</p>
                {ed.cgpa && <p className="font-medium text-slate-700">CGPA: {ed.cgpa}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications & Achievements */}
      {(certs.length > 0 || achs.length > 0) && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-100 pb-1">
            Certifications & Achievements
          </h2>
          <div className="space-y-1 text-[11px] text-slate-700">
            {certs.map((c, i) => (
              <p key={i}>• <strong>{c.title}</strong> {c.issuer ? `— ${c.issuer}` : ''} {c.year ? `(${c.year})` : ''}</p>
            ))}
            {achs.map((a, i) => (
              <p key={i}>• {a}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ====================================================
// 3. MINIMAL ATS TEMPLATE (Ultra-Sleek Monochrome)
// ====================================================
export const MinimalTemplate = ({ data = {} }) => {
  const pd = data.personalDetails || {};
  const edu = Array.isArray(data.education) ? data.education : [];
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const skills = normalizeSkills(data.skills);
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const certs = Array.isArray(data.certifications) ? data.certifications : [];
  const achs = Array.isArray(data.achievements) ? data.achievements : [];

  return (
    <div className="bg-white text-slate-950 font-sans p-8 sm:p-10 shadow-2xl rounded-sm max-w-2xl mx-auto text-xs space-y-6 leading-relaxed">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-black tracking-tight uppercase">{pd.name || 'Candidate Name'}</h1>
        <p className="text-[11px] text-slate-600 font-mono">
          {[pd.email, pd.phone, pd.address].filter(Boolean).join('  |  ')}
        </p>
        <p className="text-[11px] text-slate-800 font-mono">
          {[pd.linkedin, pd.github].filter(Boolean).join('  |  ')}
        </p>
      </div>

      {/* Technical & Professional Skills */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="space-y-2">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-black border-b-2 border-black pb-0.5">
            Technical & Professional Skills
          </h2>
          <div className="text-[11px] text-slate-900 space-y-2 leading-relaxed">
            {skills.technical?.length > 0 && (
              <p>
                <strong className="font-bold">Technical Skills: </strong>
                {skills.technical.join(', ')}
              </p>
            )}
            {skills.soft?.length > 0 && (
              <p>
                <strong className="font-bold">Soft Skills: </strong>
                {skills.soft.join(', ')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-black border-b-2 border-black pb-0.5">
            Experience
          </h2>
          {exp.map((item, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="flex justify-between font-bold text-black">
                <span>{item.role || 'Position'}{item.company ? `, ${item.company}` : ''}</span>
                <span className="font-mono text-[10px] text-slate-600">{formatDuration(item.startDate, item.endDate)}</span>
              </div>
              <p className="text-[11px] text-slate-800 whitespace-pre-line leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-black border-b-2 border-black pb-0.5">
            Projects
          </h2>
          {projects.map((proj, idx) => {
            const duration = formatDuration(proj.startDate, proj.endDate);
            return (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between font-bold text-black">
                  <span className="uppercase">{proj.name}</span>
                  {duration && <span className="font-mono text-[10px] text-slate-600">{duration}</span>}
                </div>
                <p className="text-[11px] text-slate-800 leading-relaxed">{proj.description}</p>
                {proj.technologies && (
                  <p className="text-[11px] text-slate-900">
                    <strong className="font-bold">Technologies: </strong>{proj.technologies}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Education */}
      {edu.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-black border-b-2 border-black pb-0.5">
            Education
          </h2>
          {edu.map((ed, idx) => (
            <div key={idx} className="flex justify-between">
              <div>
                <p className="font-bold text-black">{ed.degree}</p>
                <p className="text-[11px] text-slate-700">{ed.college}</p>
              </div>
              <div className="text-right font-mono text-[10px] text-slate-600">
                <p>{ed.year}</p>
                {ed.cgpa && <p>GPA: {ed.cgpa}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications & Achievements */}
      {(certs.length > 0 || achs.length > 0) && (
        <div className="space-y-1.5">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-black border-b-2 border-black pb-0.5">
            Certifications & Honors
          </h2>
          <div className="space-y-0.5 text-[11px] text-slate-800">
            {certs.map((c, i) => (
              <p key={i}>• {c.title} {c.issuer ? `— ${c.issuer}` : ''} {c.year ? `(${c.year})` : ''}</p>
            ))}
            {achs.map((a, i) => (
              <p key={i}>• {a}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
