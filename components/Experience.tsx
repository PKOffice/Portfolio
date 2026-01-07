
import React, { useEffect, useState } from 'react';
import { EXPERIENCES, EDUCATION } from '../constants.tsx';
import { MapPin, Briefcase, GraduationCap, Award, ShieldCheck, Trophy } from 'lucide-react';

const Experience: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Dynamic import observer to only load script when section is near view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !scriptLoaded) {
        const script = document.createElement('script');
        script.src = "//cdn.credly.com/assets/utilities/embed.js";
        script.async = true;
        document.body.appendChild(script);
        setScriptLoaded(true);
      }
    }, { threshold: 0.1 });

    const el = document.getElementById('experience');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [scriptLoaded]);

  return (
    <section id="experience" className="section-padding bg-[#02010a] scroll-mt-24">
      <div className="container-custom">
        {/* Experience Header */}
        <div className="max-w-4xl mb-12 md:mb-20 text-center md:text-left">
          <span className="text-indigo-500 font-black tracking-[0.5em] uppercase text-[9px] mb-4 block">Section 03 // Career History</span>
          <h2 className="text-4xl md:text-7xl font-heading font-black leading-none mb-6 uppercase">PROFESSIONAL <br/><span className="text-white/10 italic font-light">LOGS.</span></h2>
        </div>

        {/* Work Experience Mapping */}
        <div className="space-y-6 md:space-y-10 mb-20 md:mb-32">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="glass p-8 md:p-12 group relative overflow-hidden transition-all duration-700 hover:border-indigo-500/30 rounded-[24px] md:rounded-[40px] will-change-transform">
              <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-10 transition-opacity pointer-events-none">
                <span className="text-[8rem] md:text-[12rem] font-black font-heading leading-none">W{idx + 1}</span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                <div className="lg:col-span-4 space-y-3">
                  <div className="text-indigo-400 font-mono text-[9px] tracking-[0.2em] uppercase font-bold">{exp.period}</div>
                  <h3 className="text-2xl md:text-4xl font-heading font-black uppercase">{exp.company}</h3>
                  <div className="flex items-center gap-3 text-white/30 text-[10px] md:text-xs font-medium uppercase tracking-widest">
                    <MapPin size={12} className="text-indigo-500" />
                    Ahmednagar // India
                  </div>
                </div>
                
                <div className="lg:col-span-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 font-bold text-lg md:text-2xl mb-4 text-white uppercase tracking-tight">
                    <Briefcase size={20} className="text-cyan-400" />
                    {exp.role}
                  </div>
                  <p className="text-xs md:text-base text-white/40 leading-relaxed font-light max-w-2xl">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Header */}
        <div id="education" className="max-w-4xl mb-12 md:mb-20 text-center md:text-left scroll-mt-24 pt-16 border-t border-white/5">
          <span className="text-indigo-500 font-black tracking-[0.5em] uppercase text-[9px] mb-4 block">Section 04 // Academic</span>
          <h2 className="text-4xl md:text-7xl font-heading font-black leading-none mb-6 uppercase">ACADEMIC <br/><span className="text-white/10 italic font-light">RECORDS.</span></h2>
        </div>

        <div className="flex flex-col gap-6 md:gap-10">
          <div className="space-y-6 md:space-y-10">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="glass p-8 md:p-12 group relative overflow-hidden transition-all duration-700 hover:border-indigo-500/30 rounded-[24px] md:rounded-[40px] will-change-transform">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                  <div className="lg:col-span-4 space-y-3">
                    <div className="text-indigo-400 font-mono text-[9px] tracking-[0.2em] uppercase font-bold">{edu.period}</div>
                    <h3 className="text-2xl md:text-3xl font-heading font-black uppercase">{edu.institution}</h3>
                    <div className="flex items-center gap-3 text-white/30 text-[10px] md:text-xs tracking-widest">
                      <MapPin size={12} className="text-indigo-500" />
                      {edu.location}
                    </div>
                  </div>
                  <div className="lg:col-span-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 font-bold text-lg md:text-2xl mb-4 text-white tracking-tight uppercase">
                      <GraduationCap size={20} className="text-cyan-400" />
                      {edu.degree}
                    </div>
                    {edu.score && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/5 border border-indigo-500/20 rounded-xl text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                        <Trophy size={12} /> RESULT: {edu.score}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass p-8 md:p-16 rounded-[24px] md:rounded-[40px] border border-white/5 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 text-center lg:text-left space-y-4">
                <div className="inline-flex p-4 bg-white/5 rounded-2xl mb-4">
                  <Award size={40} className="text-indigo-500" />
                </div>
                <h3 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight">GLOBAL <br/><span className="text-white/20 italic font-light">BADGES.</span></h3>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                    <ShieldCheck size={14} className="text-indigo-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">AWS_CLOUD_PRACTITIONER</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 flex justify-center lg:justify-end">
                <div className="glass p-6 md:p-8 rounded-[32px] border border-white/10 transition-transform duration-700 hover:-translate-y-2 will-change-transform">
                  <div 
                    data-iframe-width="200" 
                    data-iframe-height="250" 
                    data-share-badge-id="e5b8ae96-595f-4fed-950b-45706a11bdf2" 
                    data-share-badge-host="https://www.credly.com"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
