
import React, { useEffect, useRef } from 'react';
import { PROJECTS } from '../constants.tsx';
import { ExternalLink, Github, Layers, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectArchive: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".archive-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="archive" className="section-padding bg-[#02010a]">
      <div className="container-custom" ref={containerRef}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-indigo-500 font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">Registry 03 // Full Archive</span>
            <h2 className="text-4xl md:text-7xl font-heading font-black leading-none uppercase">ALL <br/><span className="text-white/10 italic">IMPLEMENTATIONS.</span></h2>
          </div>
          <p className="text-white/30 text-right font-mono text-[10px] uppercase tracking-widest max-w-xs">
            A comprehensive list of high-fidelity digital systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="archive-item glass p-6 rounded-[32px] group hover:border-indigo-500/30 transition-all duration-500">
              <div className="aspect-[16/9] rounded-[24px] overflow-hidden mb-8 relative">
                <img 
                  src={project.image} 
                  loading="lazy" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  alt={project.title} 
                />
                <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-heading font-black group-hover:text-indigo-400 transition-colors uppercase">{project.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-light line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                   <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors"
                   >
                     Live_Sync <ExternalLink size={12} />
                   </a>
                   <div className="flex items-center gap-2 text-white/10">
                      <Zap size={14} />
                      <span className="text-[8px] font-mono">STABLE_BUILD</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectArchive;
