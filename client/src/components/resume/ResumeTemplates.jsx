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

const formatUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
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
          {pd.linkedin && <a href={formatUrl(pd.linkedin)} target="_blank" rel="noreferrer" className="underline hover:text-indigo-600">LinkedIn</a>}
          {pd.github && <a href={formatUrl(pd.github)} target="_blank" rel="noreferrer" className="underline hover:text-indigo-600">GitHub</a>}
        </div>
      </div>

      {/* Technical & Professional Skills Chips */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Technical & Professional Skills
          </h2>
          <div className="font-sans text-[11px] text-slate-800 space-y-2 leading-relaxed">
            {skills.technical?.length > 0 && (
              <div className="space-y-1">
                <p className="font-bold text-slate-900 text-[11px]">Technical Skills</p>
                <div className="flex flex-wrap gap-1">
                  {skills.technical.map((st, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-semibold border border-slate-200">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.soft?.length > 0 && (
              <div className="space-y-1 pt-1">
                <p className="font-bold text-slate-900 text-[11px]">Soft Skills</p>
                <div className="flex flex-wrap gap-1">
                  {skills.soft.map((ss, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200">
                      {ss}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {exp.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Professional Experience
          </h2>
          {exp.map((item, idx) => {
            const duration = formatDuration(item.startDate, item.endDate);
            return (
              <div key={idx} className="space-y-0.5">
                {/* Row 1: Company Name (Left) + Duration (Right) */}
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold uppercase tracking-wider text-slate-900 text-xs">{item.company || 'Company Name'}</h3>
                  {duration && <span className="font-sans text-[11px] text-slate-500 font-normal">{duration}</span>}
                </div>
                
                {/* Row 2: Job Role / Title */}
                <p className="font-semibold text-slate-800 text-[11px]">{item.role || 'Job Role / Title'}</p>
                
                {/* Description below */}
                {item.description && (
                  <p className="font-sans text-[11px] text-slate-700 whitespace-pre-line leading-relaxed pt-1">
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Projects
          </h2>
          {projects.map((proj, idx) => {
            const duration = formatDuration(proj.startDate, proj.endDate);
            return (
              <div key={idx} className="space-y-0.5">
                {/* Row 1: Project Name (Left) + Duration (Right) */}
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold uppercase tracking-wider text-slate-900 text-xs">{proj.name}</h3>
                  {duration && <span className="font-sans text-[11px] text-slate-500 font-normal">{duration}</span>}
                </div>
                
                {/* Row 2: Clickable Project Link */}
                {proj.link && (
                  <p className="font-sans text-[11px]">
                    <a
                      href={formatUrl(proj.link)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 underline hover:text-indigo-800 break-all"
                    >
                      {proj.link}
                    </a>
                  </p>
                )}
                
                {/* Description */}
                {proj.description && (
                  <p className="font-sans text-[11px] text-slate-700 leading-relaxed pt-1">{proj.description}</p>
                )}
                
                {/* Technologies */}
                {proj.technologies && (
                  <p className="font-sans text-[11px] text-slate-800 pt-0.5">
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
        <div className="space-y-3">
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
      <div className="border-l-4 border-[#4169FF] pl-4 space-y-2 flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{pd.name || 'Candidate Name'}</h1>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
            {pd.email && <span>{pd.email}</span>}
            {pd.phone && <span>• {pd.phone}</span>}
            {pd.address && <span>• {pd.address}</span>}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#4169FF] font-semibold pt-0.5">
            {pd.linkedin && <a href={formatUrl(pd.linkedin)} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>}
            {pd.github && <a href={formatUrl(pd.github)} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>}
          </div>
        </div>

        {pd.profileImage && (
          <img
            src={pd.profileImage}
            alt={pd.name || 'Candidate Profile'}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
            className="w-16 h-16 rounded-xl object-cover border-2 border-[#4169FF]/20 shadow-xs shrink-0"
          />
        )}
      </div>

      {/* Technical & Professional Skills Chips */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-100 pb-1">
            Technical & Professional Skills
          </h2>
          <div className="text-[11px] text-slate-800 space-y-2 leading-relaxed pt-1">
            {skills.technical?.length > 0 && (
              <div className="space-y-1">
                <p className="font-bold text-slate-900 text-[11px]">Technical Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.technical.map((st, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-900 text-[11px] font-semibold border border-indigo-200">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.soft?.length > 0 && (
              <div className="space-y-1 pt-1">
                <p className="font-bold text-slate-900 text-[11px]">Soft Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.soft.map((ss, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                      {ss}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-100 pb-1">
            Work Experience
          </h2>
          {exp.map((item, idx) => {
            const duration = formatDuration(item.startDate, item.endDate);
            return (
              <div key={idx} className="space-y-0.5">
                {/* Row 1: Company Name (Left) + Duration (Right) */}
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold uppercase tracking-wider text-slate-900 text-xs">{item.company || 'Company Name'}</h3>
                  {duration && <span className="text-[11px] text-slate-500 font-medium">{duration}</span>}
                </div>
                
                {/* Row 2: Job Role / Title */}
                <p className="font-semibold text-indigo-900 text-[11px]">{item.role || 'Position'}</p>
                
                {/* Description */}
                {item.description && (
                  <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-line pt-1">{item.description}</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-100 pb-1">
            Projects
          </h2>
          {projects.map((proj, idx) => {
            const duration = formatDuration(proj.startDate, proj.endDate);
            return (
              <div key={idx} className="space-y-0.5">
                {/* Row 1: Project Name (Left) + Duration (Right) */}
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold uppercase tracking-wider text-slate-900 text-xs">{proj.name}</h3>
                  {duration && <span className="text-[11px] text-slate-500 font-medium">{duration}</span>}
                </div>
                
                {/* Row 2: Clickable Project Link */}
                {proj.link && (
                  <p className="text-[11px]">
                    <a
                      href={formatUrl(proj.link)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 underline hover:text-indigo-800 break-all font-medium"
                    >
                      {proj.link}
                    </a>
                  </p>
                )}
                
                {/* Description */}
                {proj.description && <p className="text-[11px] text-slate-700 leading-relaxed pt-1">{proj.description}</p>}
                
                {/* Technologies */}
                {proj.technologies && (
                  <p className="text-[11px] text-slate-800 pt-0.5">
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
        <div className="space-y-3">
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
          {[pd.linkedin && formatUrl(pd.linkedin), pd.github && formatUrl(pd.github)].filter(Boolean).join('  |  ')}
        </p>
      </div>

      {/* Technical & Professional Skills */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="space-y-2">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-black border-b-2 border-black pb-0.5">
            Technical & Professional Skills
          </h2>
          <div className="text-[11px] text-slate-900 space-y-1.5 leading-relaxed">
            {skills.technical?.length > 0 && (
              <div className="space-y-1">
                <p className="font-bold text-black text-[11px]">Technical Skills</p>
                <div className="flex flex-wrap gap-1">
                  {skills.technical.map((st, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-black text-[10px] font-semibold border border-slate-300">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.soft?.length > 0 && (
              <div className="space-y-1 pt-1">
                <p className="font-bold text-black text-[11px]">Soft Skills</p>
                <div className="flex flex-wrap gap-1">
                  {skills.soft.map((ss, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-medium border border-slate-300">
                      {ss}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-black border-b-2 border-black pb-0.5">
            Experience
          </h2>
          {exp.map((item, idx) => {
            const duration = formatDuration(item.startDate, item.endDate);
            return (
              <div key={idx} className="space-y-0.5">
                {/* Row 1: Company Name (Left) + Duration (Right) */}
                <div className="flex justify-between items-baseline">
                  <h3 className="font-black uppercase tracking-wider text-black text-xs">{item.company || 'Company Name'}</h3>
                  {duration && <span className="font-mono text-[10px] text-slate-600">{duration}</span>}
                </div>
                
                {/* Row 2: Job Role / Title */}
                <p className="font-bold text-slate-900 text-[11px]">{item.role || 'Position'}</p>
                
                {/* Description */}
                {item.description && (
                  <p className="text-[11px] text-slate-800 whitespace-pre-line leading-relaxed pt-1">{item.description}</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-black border-b-2 border-black pb-0.5">
            Projects
          </h2>
          {projects.map((proj, idx) => {
            const duration = formatDuration(proj.startDate, proj.endDate);
            return (
              <div key={idx} className="space-y-0.5">
                {/* Row 1: Project Name (Left) + Duration (Right) */}
                <div className="flex justify-between items-baseline">
                  <h3 className="font-black uppercase tracking-wider text-black text-xs">{proj.name}</h3>
                  {duration && <span className="font-mono text-[10px] text-slate-600">{duration}</span>}
                </div>
                
                {/* Row 2: Clickable Project Link */}
                {proj.link && (
                  <p className="text-[11px]">
                    <a
                      href={formatUrl(proj.link)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-black underline font-mono text-[10px] hover:text-indigo-600 break-all"
                    >
                      {proj.link}
                    </a>
                  </p>
                )}
                
                {/* Description */}
                {proj.description && <p className="text-[11px] text-slate-800 leading-relaxed pt-0.5">{proj.description}</p>}
                
                {/* Technologies */}
                {proj.technologies && (
                  <p className="text-[11px] text-slate-900 pt-0.5">
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
        <div className="space-y-3">
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
