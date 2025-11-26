import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  Globe, 
  FileText,
  CheckCircle
} from 'lucide-react';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: { 
      fullName: '', 
      email: '', 
      phone: '', 
      location: '', 
      linkedin: '', 
      github: '', 
      portfolio: '',
      summary: '' 
    },
    experience: [],
    education: [],
    projects: [],
    skills: '',
    certifications: [],
    languages: []
  });

  const [previewScale, setPreviewScale] = useState(0.7);
  const [activeSection, setActiveSection] = useState('personalInfo');

  // Native print handler
  const handlePrint = () => {
    window.print();
  };

  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const newArray = [...resumeData[section]];
    newArray[index] = { ...newArray[index], [field]: value };
    setResumeData(prev => ({ ...prev, [section]: newArray }));
  };

  const addArrayItem = (section, item) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], item]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const SectionHeader = ({ id, title, icon: Icon }) => (
    <button 
      onClick={() => toggleSection(id)}
      className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
        activeSection === id 
          ? 'bg-neonBlue/10 text-neonBlue border border-neonBlue/20' 
          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
      }`}
    >
      <div className="flex items-center gap-3 font-semibold">
        <Icon size={20} />
        {title}
      </div>
      {activeSection === id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </button>
  );

  const inputClassName = "w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-2.5 rounded-lg text-sm text-gray-900 dark:text-white dark:placeholder-gray-300 focus:border-neonBlue focus:ring-1 focus:ring-neonBlue focus:outline-none transition-all";

  return (
    <div className="h-[calc(100vh-80px)] p-4 md:p-6 max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 print:block print:h-auto print:p-0 print:overflow-visible">
      
      {/* Editor Panel - Hidden on Print */}
      <div className="flex flex-col gap-4 h-full overflow-hidden print:hidden">
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="text-neonBlue" /> Editor
          </h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold border border-green-500/20">
            <CheckCircle size={14} /> ATS Friendly
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {/* Personal Info */}
          <div className="space-y-2">
            <SectionHeader id="personalInfo" title="Personal Information" icon={User} />
            <AnimatePresence>
              {activeSection === 'personalInfo' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <input type="text" placeholder="Full Name" className={inputClassName} value={resumeData.personalInfo.fullName} onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)} />
                      <input type="email" placeholder="Email" className={inputClassName} value={resumeData.personalInfo.email} onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)} />
                      <input type="text" placeholder="Phone" className={inputClassName} value={resumeData.personalInfo.phone} onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)} />
                      <input type="text" placeholder="Location" className={inputClassName} value={resumeData.personalInfo.location} onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)} />
                      <input type="text" placeholder="LinkedIn URL" className={inputClassName} value={resumeData.personalInfo.linkedin} onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)} />
                      <input type="text" placeholder="GitHub URL" className={inputClassName} value={resumeData.personalInfo.github} onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)} />
                      <input type="text" placeholder="Portfolio URL" className={inputClassName} value={resumeData.personalInfo.portfolio} onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)} />
                      <textarea placeholder="Professional Summary" className={`${inputClassName} h-32`} value={resumeData.personalInfo.summary} onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <SectionHeader id="experience" title="Experience" icon={Briefcase} />
            <AnimatePresence>
              {activeSection === 'experience' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="relative p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                        <button onClick={() => removeArrayItem('experience', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-600"><Trash2 size={16} /></button>
                        <div className="grid grid-cols-1 gap-3 mb-3">
                          <input type="text" placeholder="Job Title" className={inputClassName} value={exp.title} onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} />
                          <input type="text" placeholder="Company" className={inputClassName} value={exp.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} />
                          <input type="text" placeholder="Date Range" className={inputClassName} value={exp.date} onChange={(e) => handleArrayChange('experience', index, 'date', e.target.value)} />
                          <input type="text" placeholder="Location" className={inputClassName} value={exp.location} onChange={(e) => handleArrayChange('experience', index, 'location', e.target.value)} />
                        </div>
                        <textarea placeholder="Description (Bullet points recommended)" className={`${inputClassName} h-24`} value={exp.description} onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)} />
                      </div>
                    ))}
                    <button onClick={() => addArrayItem('experience', { title: '', company: '', date: '', location: '', description: '' })} className="add-btn">+ Add Experience</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <SectionHeader id="education" title="Education" icon={GraduationCap} />
            <AnimatePresence>
              {activeSection === 'education' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="relative p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                        <button onClick={() => removeArrayItem('education', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-600"><Trash2 size={16} /></button>
                        <div className="grid grid-cols-1 gap-3">
                          <input type="text" placeholder="Degree" className={inputClassName} value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} />
                          <input type="text" placeholder="School / University" className={inputClassName} value={edu.school} onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)} />
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="Year" className={inputClassName} value={edu.year} onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)} />
                            <input type="text" placeholder="Grade/CGPA" className={inputClassName} value={edu.grade} onChange={(e) => handleArrayChange('education', index, 'grade', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => addArrayItem('education', { degree: '', school: '', year: '', grade: '' })} className="add-btn">+ Add Education</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Projects */}
          <div className="space-y-2">
            <SectionHeader id="projects" title="Projects" icon={Code} />
            <AnimatePresence>
              {activeSection === 'projects' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                    {resumeData.projects.map((proj, index) => (
                      <div key={index} className="relative p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                        <button onClick={() => removeArrayItem('projects', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-600"><Trash2 size={16} /></button>
                        <div className="grid grid-cols-1 gap-3 mb-3">
                          <input type="text" placeholder="Project Name" className={inputClassName} value={proj.name} onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)} />
                          <input type="text" placeholder="Technologies Used" className={inputClassName} value={proj.tech} onChange={(e) => handleArrayChange('projects', index, 'tech', e.target.value)} />
                          <input type="text" placeholder="Link (Optional)" className={inputClassName} value={proj.link} onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)} />
                        </div>
                        <textarea placeholder="Description" className={`${inputClassName} h-20`} value={proj.description} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)} />
                      </div>
                    ))}
                    <button onClick={() => addArrayItem('projects', { name: '', tech: '', link: '', description: '' })} className="add-btn">+ Add Project</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <SectionHeader id="skills" title="Skills" icon={Award} />
            <AnimatePresence>
              {activeSection === 'skills' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <textarea 
                      placeholder="Comma separated skills (e.g. Java, React, SQL, AWS)" 
                      className={`${inputClassName} h-32`}
                      value={resumeData.skills}
                      onChange={(e) => setResumeData(prev => ({ ...prev, skills: e.target.value }))}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <SectionHeader id="certifications" title="Certifications" icon={Award} />
            <AnimatePresence>
              {activeSection === 'certifications' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                    {resumeData.certifications.map((cert, index) => (
                      <div key={index} className="relative p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                        <button onClick={() => removeArrayItem('certifications', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-600"><Trash2 size={16} /></button>
                        <div className="grid grid-cols-1 gap-3">
                          <input type="text" placeholder="Certification Name" className={inputClassName} value={cert.name} onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)} />
                          <input type="text" placeholder="Issuer" className={inputClassName} value={cert.issuer} onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)} />
                          <input type="text" placeholder="Year" className={inputClassName} value={cert.year} onChange={(e) => handleArrayChange('certifications', index, 'year', e.target.value)} />
                        </div>
                      </div>
                    ))}
                    <button onClick={() => addArrayItem('certifications', { name: '', issuer: '', year: '' })} className="add-btn">+ Add Certification</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <SectionHeader id="languages" title="Languages" icon={Globe} />
            <AnimatePresence>
              {activeSection === 'languages' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                    {resumeData.languages.map((lang, index) => (
                      <div key={index} className="relative p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                        <button onClick={() => removeArrayItem('languages', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-600"><Trash2 size={16} /></button>
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" placeholder="Language" className={inputClassName} value={lang.name} onChange={(e) => handleArrayChange('languages', index, 'name', e.target.value)} />
                          <input type="text" placeholder="Proficiency" className={inputClassName} value={lang.level} onChange={(e) => handleArrayChange('languages', index, 'level', e.target.value)} />
                        </div>
                      </div>
                    ))}
                    <button onClick={() => addArrayItem('languages', { name: '', level: '' })} className="add-btn">+ Add Language</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Preview Panel - Full Width on Print */}
      <div className="flex flex-col h-full overflow-hidden print:overflow-visible print:block print:h-auto">
        <div className="flex justify-between items-center mb-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm shrink-0 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Live Preview</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button onClick={() => setPreviewScale(s => Math.max(0.4, s - 0.1))} className="zoom-btn">-</button>
              <span className="text-xs font-medium w-12 text-center text-gray-600 dark:text-gray-300">{Math.round(previewScale * 100)}%</span>
              <button onClick={() => setPreviewScale(s => Math.min(1.5, s + 0.1))} className="zoom-btn">+</button>
            </div>
            <button onClick={handlePrint} className="flex items-center gap-2 bg-neonBlue text-black font-bold px-4 py-2 rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-neonBlue/20">
              <Download size={18} /> Download PDF
            </button>
          </div>
        </div>
        
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 rounded-xl overflow-auto p-8 shadow-inner flex justify-center items-start print:bg-white print:p-0 print:shadow-none print:overflow-visible print:block">
          <div 
            className="print:w-full print:transform-none"
            style={{ 
              transform: `scale(${previewScale})`, 
              transformOrigin: 'top center' 
            }}
          >
            <div 
              className="bg-white text-black shadow-2xl p-[10mm] border border-gray-400 print:shadow-none print:border-none print:p-0 print:w-full" 
              style={{ 
                fontFamily: '"Inter", "Roboto", "Segoe UI", sans-serif',
                width: '210mm',
                minHeight: '297mm',
                lineHeight: '1.35',
                fontSize: '10pt',
                color: '#1a1a1a'
              }}
            >
              {/* Header - Professional & Centered */}
              <header className="mb-4 border-b-2 border-gray-900 pb-3 text-center">
                <h1 className="text-3xl font-extrabold uppercase tracking-wide mb-1 text-gray-900">{resumeData.personalInfo.fullName || 'YOUR NAME'}</h1>
                <div className="flex flex-wrap justify-center gap-x-4 text-sm text-gray-700 font-medium">
                  {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
                  {resumeData.personalInfo.email && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span>{resumeData.personalInfo.email}</span>
                    </>
                  )}
                  {resumeData.personalInfo.location && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span>{resumeData.personalInfo.location}</span>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 text-sm text-blue-700 mt-1 font-medium">
                  {resumeData.personalInfo.linkedin && (
                    <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                      LinkedIn
                    </a>
                  )}
                  {resumeData.personalInfo.github && (
                    <>
                      <span className="text-gray-400">•</span>
                      <a href={resumeData.personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                        GitHub
                      </a>
                    </>
                  )}
                  {resumeData.personalInfo.portfolio && (
                    <>
                      <span className="text-gray-400">•</span>
                      <a href={resumeData.personalInfo.portfolio} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                        Portfolio
                      </a>
                    </>
                  )}
                </div>
              </header>

              {/* Summary */}
              {resumeData.personalInfo.summary && (
                <section className="mb-3 page-break-avoid">
                  <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-2 pb-0.5 text-gray-900 tracking-wider">Professional Summary</h3>
                  <p className="text-sm leading-relaxed text-gray-800 text-justify">{resumeData.personalInfo.summary}</p>
                </section>
              )}

              {/* Education */}
              {resumeData.education.length > 0 && (
                <section className="mb-3 page-break-avoid">
                  <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-2 pb-0.5 text-gray-900 tracking-wider">Education</h3>
                  <div className="space-y-2">
                    {resumeData.education.map((edu, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-base text-gray-900">{edu.school}</span>
                          <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{edu.year}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="italic text-gray-800">{edu.degree}</span>
                          {edu.grade && <span className="text-gray-700 font-medium">GPA: {edu.grade}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Experience */}
              {resumeData.experience.length > 0 && (
                <section className="mb-3 page-break-avoid">
                  <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-2 pb-0.5 text-gray-900 tracking-wider">Experience</h3>
                  <div className="space-y-3">
                    {resumeData.experience.map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="font-bold text-base text-gray-900">{exp.title}</span>
                          <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{exp.date}</span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm italic text-gray-800 font-medium">{exp.company}</span>
                          <span className="text-sm text-gray-600">{exp.location}</span>
                        </div>
                        {exp.description && (
                          <ul className="list-disc list-outside ml-4 text-sm text-gray-800 space-y-0.5">
                            {exp.description.split('\n').map((line, j) => line.trim() && <li key={j} className="pl-1 text-justify">{line}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {resumeData.projects.length > 0 && (
                <section className="mb-3 page-break-avoid">
                  <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-2 pb-0.5 text-gray-900 tracking-wider">Projects</h3>
                  <div className="space-y-2">
                    {resumeData.projects.map((proj, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline mb-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-base text-gray-900">{proj.name}</span>
                            {proj.tech && <span className="text-xs font-normal text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-300 print:border-gray-400">{proj.tech}</span>}
                          </div>
                          {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-blue-700 hover:underline whitespace-nowrap">[View Project]</a>}
                        </div>
                        {proj.description && (
                          <ul className="list-disc list-outside ml-4 text-sm text-gray-800 space-y-0.5">
                            {proj.description.split('\n').map((line, j) => line.trim() && <li key={j} className="pl-1 text-justify">{line}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Technical Skills */}
              {resumeData.skills && (
                <section className="mb-3 page-break-avoid">
                  <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-2 pb-0.5 text-gray-900 tracking-wider">Technical Skills</h3>
                  <p className="text-sm text-gray-800 leading-relaxed text-justify">{resumeData.skills}</p>
                </section>
              )}

              {/* Certifications */}
              {resumeData.certifications.length > 0 && (
                <section className="mb-3 page-break-avoid">
                  <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-2 pb-0.5 text-gray-900 tracking-wider">Certifications</h3>
                  <ul className="list-disc list-outside ml-4 text-sm text-gray-800 space-y-0.5">
                    {resumeData.certifications.map((cert, i) => (
                      <li key={i} className="pl-1">
                        <span className="font-bold">{cert.name}</span> — <span className="italic">{cert.issuer}</span> {cert.year && <span className="text-gray-600">({cert.year})</span>}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Languages */}
              {resumeData.languages.length > 0 && (
                <section className="mb-3 page-break-avoid">
                  <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-2 pb-0.5 text-gray-900 tracking-wider">Languages</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-800">
                    {resumeData.languages.map((lang, i) => (
                      <span key={i}><span className="font-bold">{lang.name}</span>: {lang.level}</span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .add-btn {
          @apply w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:border-neonBlue hover:text-neonBlue transition-colors text-sm font-medium;
        }
        .zoom-btn {
          @apply w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold transition-colors;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 20px;
        }
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          body {
            background: white;
          }
          .page-break-avoid {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
