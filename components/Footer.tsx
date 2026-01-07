
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-slate-950 border-t border-white/5">
      <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
           <p className="text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase">
             © 2024 PRATHMESH KAMBLE // JAVA_DEVELOPER
           </p>
           <p className="text-white/10 text-[8px] font-mono tracking-widest uppercase">
             BUILT_WITH_REACT_THREE_GSAP_GEMINI
           </p>
        </div>
        
        <div className="flex gap-12">
           <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-sky-500 transition-colors uppercase tracking-[0.3em]">REPOSITORIES</a>
           <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-sky-500 transition-colors uppercase tracking-[0.3em]">DOCUMENTATION</a>
           <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-sky-500 transition-colors uppercase tracking-[0.3em]">PRIVACY_SHIELD</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
