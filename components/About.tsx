
import React from 'react';
import { SKILLS_CATEGORIES } from '../constants.tsx';

const About: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-[#02010a] scroll-mt-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-8 lg:gap-20">
          
          <div className="lg:col-span-5 space-y-4 md:space-y-6 lg:space-y-12">
            <div>
              <span className="text-indigo-500 font-black tracking-[0.5em] uppercase text-[8px] md:text-[10px] mb-3 md:mb-6 block">Section 01 // Overview</span>
              <h2 className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-heading font-black leading-none mb-4 md:mb-8">THE <br/><span className="text-white/10 italic">CRAFT.</span></h2>
              <p className="text-sm md:text-lg lg:text-xl text-white/50 font-light leading-relaxed max-w-xl">
                Expertise anchored in <span className="text-white font-medium">Enterprise Java Architecture</span>. I synthesize complex requirements into high-performance, resilient systems.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:gap-10 pt-1 md:pt-2">
               <div className="space-y-1">
                  <div className="text-2xl md:text-5xl lg:text-6xl font-heading font-black text-indigo-500">1.3+</div>
                  <div className="text-[7px] md:text-[9px] font-mono uppercase tracking-widest text-white/30">Professional Years</div>
               </div>
               <div className="space-y-1">
                  <div className="text-2xl md:text-5xl lg:text-6xl font-heading font-black text-cyan-400">7+</div>
                  <div className="text-[7px] md:text-[9px] font-mono uppercase tracking-widest text-white/30">Live Productions</div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 lg:gap-8 pt-6 md:pt-0">
            {SKILLS_CATEGORIES.map(cat => (
              <div key={cat.name} className="glass p-5 md:p-6 lg:p-10 group hover:border-indigo-500/50 transition-all duration-500 rounded-[20px] md:rounded-[32px]">
                <h3 className="font-heading text-sm md:text-lg lg:text-xl font-black mb-3 md:mb-8 group-hover:text-indigo-400 transition-colors uppercase tracking-widest">{cat.name}</h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {cat.items.map(skill => (
                    <span key={skill} className="text-[7px] md:text-[9px] lg:text-[10px] font-black tracking-[0.15em] uppercase py-1.5 px-2.5 md:py-2.5 md:px-4 bg-white/5 border border-white/5 rounded-lg md:rounded-xl text-white/40 group-hover:text-white/80 transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
