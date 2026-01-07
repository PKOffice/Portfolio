
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PROJECTS } from '../constants.tsx';
import { RefreshCw, Monitor, Zap, Globe, Image as ImageIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, containerAnimation }: any) => {
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const DESKTOP_WIDTH = 1440;

  // Optimize image URL for faster loading
  const optimizedImg = useMemo(() => `${project.image}&w=1000&q=70&auto=format`, [project.image]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { scale: 0.9, opacity: 0 },
        { 
          scale: 1, opacity: 1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "left right",
            end: "center center",
            containerAnimation: containerAnimation,
            scrub: 0.5,
          }
        }
      );
    }
    const calculateScale = () => {
      if (viewportRef.current) {
        setScale(viewportRef.current.offsetWidth / DESKTOP_WIDTH);
      }
    };
    window.addEventListener('resize', calculateScale);
    calculateScale();
    return () => window.removeEventListener('resize', calculateScale);
  }, [containerAnimation]);

  const handleToggleLive = () => {
    if (!isLive) {
      setIsLoading(true);
      setIsLive(true);
    } else {
      setIsLive(false);
    }
  };

  return (
    <div ref={cardRef} className="project-card-v2 relative flex-shrink-0 w-[85vw] md:w-[65vw] lg:w-[55vw] h-[50vh] md:h-[70vh] will-change-transform perspective-1000">
      <div className="browser-frame h-full glass relative z-10 flex flex-col rounded-[24px] md:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl group">
        
        {/* Browser Top Bar */}
        <div className="browser-header h-10 md:h-12 flex items-center justify-between px-5 md:px-8 bg-[#0a0a15] border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-white/10'}`}></div>
              <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter">Status: {isLive ? 'Link_Active' : 'Offline_Cached'}</span>
            </div>
            {isLive && (
              <button 
                onClick={() => setIsLoading(true)} 
                className="p-1 hover:bg-white/10 rounded transition-colors text-indigo-400"
                title="Force Reload"
              >
                <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
              </button>
            )}
          </div>
        </div>
        
        {/* Content Viewport */}
        <div ref={viewportRef} className="relative flex-1 bg-[#02010a] overflow-hidden">
          {/* Static Preview Image - Always visible or as background */}
          <img 
            src={optimizedImg} 
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${isLive && !isLoading ? 'opacity-20 blur-sm scale-110' : 'opacity-60 scale-100'}`} 
            alt={project.title} 
          />
          
          {/* Live Iframe View - Conditional Rendering for Performance */}
          {isLive && (
            <div className="absolute inset-0 w-full h-full z-20">
              {isLoading && (
                <div className="absolute inset-0 z-30 bg-[#02010a]/80 backdrop-blur-md flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-b-2 border-indigo-500 animate-spin rounded-full"></div>
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.4em]">Mounting_Instance...</span>
                  </div>
                </div>
              )}
              <div style={{ width: `${DESKTOP_WIDTH}px`, height: `${100 / scale}%`, transform: `scale(${scale})`, transformOrigin: '0 0' }}>
                <iframe 
                  src={project.link} 
                  className={`w-full h-full border-none transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`} 
                  onLoad={() => setIsLoading(false)} 
                  title={project.title} 
                />
              </div>
            </div>
          )}

          {/* Interactive Info Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-[#02010a] via-[#02010a]/30 to-transparent transition-all duration-700 pointer-events-none flex flex-col justify-end p-8 md:p-14 ${isLive ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0 group-hover:via-[#02010a]/50'}`}>
            <div className="space-y-4">
              <div className="flex gap-2">
                {project.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl md:text-5xl font-heading font-black leading-none">
                {project.title}
              </h3>
              <p className="text-xs md:text-sm text-white/40 font-light max-w-sm line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center gap-4 pt-4 pointer-events-auto">
                <button 
                  onClick={handleToggleLive}
                  className="px-8 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-2"
                >
                  <Globe size={14} /> Link_Live
                </button>
                <a 
                  href={project.link} 
                  target="_blank" 
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white transition-colors"
                >
                  <Zap size={16} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Active Badge if Live */}
          {isLive && (
            <button 
              onClick={() => setIsLive(false)}
              className="absolute top-4 right-4 z-40 p-3 bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl backdrop-blur-xl hover:bg-red-500 hover:text-white transition-all pointer-events-auto text-[8px] font-black uppercase tracking-widest"
            >
              Terminate_View
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectCarousel: React.FC = () => {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [pinAnimation, setPinAnimation] = useState<any>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const pin = gsap.to(horizontalRef.current, {
        x: () => -(horizontalRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${horizontalRef.current!.scrollWidth * 0.8}`,
          invalidateOnRefresh: true,
        },
      });
      setPinAnimation(pin);
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} id="projects" className="relative bg-[#02010a] overflow-hidden h-screen flex flex-col justify-center scroll-mt-24">
      <div className="absolute inset-y-0 left-0 w-[15vw] bg-gradient-to-r from-[#02010a] to-transparent z-30 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-[15vw] bg-gradient-to-l from-[#02010a] to-transparent z-30 pointer-events-none"></div>

      <div className="container-custom mb-8 relative z-40 pointer-events-none">
        <div className="space-y-4">
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">Log 02 // Project Archive</span>
          <h2 className="text-4xl md:text-8xl font-heading font-black leading-none tracking-tighter">
            SELECTED <br/><span className="text-white/10 italic">WORK.</span>
          </h2>
        </div>
      </div>

      <div ref={horizontalRef} className="flex flex-nowrap items-center gap-10 md:gap-20 px-[10vw] relative z-20 will-change-transform">
        {PROJECTS.map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            idx={idx} 
            containerAnimation={pinAnimation} 
          />
        ))}
        <div className="flex-shrink-0 w-[10vw]"></div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
