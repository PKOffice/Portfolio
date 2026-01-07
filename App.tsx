
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import ProjectCarousel from './components/ProjectCarousel.tsx';
import Experience from './components/Experience.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import Terminal from './components/Terminal.tsx';
import Scene from './components/Scene.tsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    // Optimized reveal animation for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      gsap.fromTo(section, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    const handleOpenTerminal = () => setIsTerminalOpen(true);
    window.addEventListener('open-terminal', handleOpenTerminal);
    
    // Smooth scroll progress bar
    gsap.to("#scroll-progress-bar", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      }
    });

    return () => {
      window.removeEventListener('open-terminal', handleOpenTerminal);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative text-white selection:bg-indigo-500 selection:text-white bg-[#02010a]">
      {/* Background 3D Particles */}
      <Scene />
      
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />
      
      <main className="relative z-10">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <About />
        <ProjectCarousel />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      
      {/* Global Scroll Indicator */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[1000] pointer-events-none">
        <div id="scroll-progress-bar" className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 w-0"></div>
      </div>
    </div>
  );
};

export default App;
