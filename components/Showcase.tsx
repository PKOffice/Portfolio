
import React, { useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowRight, Code2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Showcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.stack-card');
    cards.forEach((card: any, i: number) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top top+=10%",
        endTrigger: sectionRef.current,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        scrub: true,
      });

      gsap.to(card, {
        scale: 1 - (cards.length - i) * 0.05,
        opacity: 0.8,
        scrollTrigger: {
          trigger: card,
          start: "top top+=5%",
          endTrigger: sectionRef.current,
          end: "bottom bottom",
          scrub: true,
        }
      });
    });
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-40 container mx-auto px-6 relative">
      <div className="mb-32">
        <span className="text-violet-400 font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Portfolio Showcase</span>
        <h2 className="text-6xl md:text-9xl font-heading font-black leading-none">CRAFTING <br/><span className="italic font-light opacity-30">SYSTEMS.</span></h2>
      </div>

      <div className="flex flex-col gap-20">
        {PROJECTS.map((project, idx) => (
          <div key={project.id} className="stack-card h-[70vh] glass-card p-8 md:p-16 flex flex-col md:flex-row gap-12 overflow-hidden items-center group">
            <div className="w-full md:w-1/2 h-full rounded-[30px] overflow-hidden">
               <img src={project.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={project.title} />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="flex gap-3 mb-8">
                 {project.tags.map(tag => (
                   <span key={tag} className="text-[10px] font-bold tracking-widest uppercase py-2 px-4 bg-white/5 rounded-full border border-white/5">{tag}</span>
                 ))}
              </div>
              <h3 className="text-4xl md:text-6xl font-heading font-black mb-6">{project.title}</h3>
              <p className="text-lg text-white/50 leading-relaxed mb-10 font-light">
                {project.description}
              </p>
              <button className="w-fit flex items-center gap-4 text-sm font-bold tracking-widest uppercase hover:gap-6 transition-all duration-300">
                 Explore Project <ArrowRight className="text-violet-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Showcase;
