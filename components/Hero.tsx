
import React, { useEffect } from 'react';
import { ShieldCheck, Cpu, Layout, Sparkles, MoveDown, Terminal as TerminalIcon } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  onOpenTerminal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".reveal-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
      });
      
      gsap.to(".profile-float", {
        y: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    
    return () => ctx.revert();
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-32 md:pt-20 pb-20 overflow-hidden bg-transparent">
      <div className="container-custom relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Main Info Side */}
          <div className="flex-1 space-y-6 lg:space-y-10 text-center lg:text-left">
            <div className="reveal-item inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
               <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
               <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/40 font-mono">Status: Tata Electronics // Active</span>
            </div>

            <div className="flex flex-col md:flex-row items-center lg:items-start gap-8 md:gap-12">
              <div className="space-y-4 flex-1">
                <h1 className="reveal-item text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-black leading-[0.85] tracking-tighter uppercase">
                  PRATHMESH <br />
                  <span className="text-white/40 italic font-light">NARAYAN.</span>
                </h1>
                
                <div className="reveal-item max-w-lg mx-auto lg:mx-0">
                  <p className="text-xs md:text-sm lg:text-base text-white/40 font-light leading-relaxed">
                    Engineering <span className="text-white font-medium">Enterprise Java</span> logic with high-fidelity <span className="text-white font-medium">Immersive React</span> interfaces.
                  </p>
                </div>
              </div>

              {/* Profile Image - Optimized with smaller dimensions and decoding async */}
              <div className="profile-float relative w-[160px] h-[220px] md:w-[240px] md:h-[320px] lg:w-[280px] lg:h-[380px] shrink-0 reveal-item mx-auto md:mx-0 shadow-2xl will-change-transform">
                <div className="portal-bg rounded-[32px] opacity-10"></div>
                <div className="relative w-full h-full glass rounded-[32px] overflow-hidden border border-white/10 p-2">
                  <div className="w-full h-full rounded-[24px] overflow-hidden bg-slate-900 group">
                    <img 
                      src="images/photoSelf.jpeg?q=70&w=400&auto=format&fit=crop" 
                      alt="Prathmesh Kamble"
                      className="w-full h-full object-cover  transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02010a] via-transparent to-transparent opacity-60"></div>
                  </div>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 whitespace-nowrap">
                     <TerminalIcon size={12} className="text-indigo-400" />
                     <span className="text-[8px] font-mono font-bold tracking-widest text-white/50 uppercase">v2.5_Stable</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Group */}
            <div className="reveal-item flex flex-wrap justify-center lg:justify-start gap-4 items-center pt-4">
               <a 
                href="#projects" 
                onClick={(e) => handleSmoothScroll(e, 'projects')}
                className="px-8 py-4 bg-white text-black rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-3"
               >
                  Project Grid <MoveDown size={14} />
               </a>
               <button 
                onClick={onOpenTerminal}
                className="px-8 py-4 border border-white/5 bg-white/5 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all active:scale-95"
               >
                  Sync Console
               </button>
               <div className="hidden sm:flex items-center gap-4 px-6 py-4 border border-white/5 rounded-2xl bg-white/[0.01]">
                  <Cpu size={16} className="text-white/10" />
                  <Layout size={16} className="text-white/10" />
                  <ShieldCheck size={16} className="text-white/10" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
