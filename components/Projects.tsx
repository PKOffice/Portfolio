
import React, { useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Github, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(".project-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-40 bg-slate-950/30">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-sky-500 text-xs font-bold tracking-widest mb-6 block">03 // ARCHITECTURAL_BUILDS</span>
            <h2 className="text-5xl md:text-7xl font-heading font-black text-white leading-none">FEATURED <br/><span className="text-slate-500">IMPLEMENTATIONS.</span></h2>
          </div>
          <p className="text-slate-500 text-right font-light italic max-w-sm">
            "Engineering logic into tangible enterprise systems."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project, idx) => (
            <div key={project.id} className="project-card border-technical group hover:border-sky-500/40 transition-all duration-700">
              <div className="aspect-video overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute top-6 left-6 font-mono text-[10px] bg-slate-950/80 px-4 py-1 border border-white/10 text-sky-400">
                  BUILD_REF_{project.id}
                </div>
              </div>
              
              <div className="p-10">
                <div className="flex gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold tracking-widest uppercase py-1 px-3 border border-white/5 text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-4xl font-heading font-black mb-6 group-hover:text-sky-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 leading-relaxed font-light mb-10 h-20 overflow-hidden text-ellipsis">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                   <div className="flex gap-4">
                      <a href="#" className="w-12 h-12 border-technical flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        <Github size={18} />
                      </a>
                      <a href="#" className="w-12 h-12 border-technical flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        <ExternalLink size={18} />
                      </a>
                   </div>
                   <div className="font-mono text-[10px] text-slate-600 flex items-center gap-2">
                      <Layers size={14} />
                      PRODUCTION_READY
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

export default Projects;
