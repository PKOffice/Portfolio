
import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Track active section for nav highlighting
    const sections = ['home', 'about', 'projects','experience', 'education', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Detect when section is in the top/middle of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    closeMenu();
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

  const menuItems = [
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Education', id: 'education' },
    { name: 'Contact', id: 'contact' }
  ];

  const Logo = () => (
    <div className="flex items-center gap-2 md:gap-3 group cursor-pointer">
      <div className="relative">
        <div className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 group-hover:border-indigo-500/50 transition-all duration-500 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-20 grayscale">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200" 
              className="w-full h-full object-cover"
              alt="Tech Texture"
            />
          </div>
          <span className="relative z-10 font-modern font-black text-xl md:text-2xl tracking-[-0.12em] select-none leading-none">
            <span className="text-white">P</span>
            <span className="text-indigo-500">K</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 md:w-3.5 md:h-3.5 bg-indigo-600 rounded-full border-2 border-[#02010a] flex items-center justify-center">
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
        </div>
      </div>
      <div className="flex flex-col -space-y-0.5 md:-space-y-1">
        <div className="flex items-center gap-1.5">
           <span className="text-xs md:text-sm font-modern font-black tracking-wider uppercase text-white group-hover:text-indigo-400 transition-colors">Prathmesh</span>
           <Cpu size={8} className="text-white/20 hidden sm:block" />
        </div>
        <span className="text-[6px] md:text-[7px] font-mono text-white/30 tracking-[0.3em] md:tracking-[0.4em] uppercase">Engineer 2</span>
      </div>
    </div>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-[#02010a]/80 backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent py-5 md:py-6 lg:py-8'}`}>
        <div className="container-custom flex items-center justify-between">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
            <Logo />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`nav-link text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-1 ${activeSection === item.id ? 'text-indigo-400' : 'text-white/40 hover:text-white'}`}
              >
                {item.name}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-indigo-500/50"></span>
                )}
              </a>
            ))}
            <button 
              onClick={onOpenTerminal}
              className="ml-2 lg:ml-4 px-6 py-2.5 bg-white text-black rounded-full text-[10px] lg:text-[11px] font-black uppercase tracking-[0.15em] hover:bg-indigo-500 hover:text-white transition-all transform active:scale-95 shadow-xl shadow-white/5"
            >
              Launch Terminal
            </button>
          </div>

          <button onClick={toggleMenu} aria-label="Toggle Menu" className="md:hidden relative z-[110] p-1.5 text-white hover:text-indigo-500 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[105] bg-[#02010a] transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="absolute top-0 left-0 w-full p-5 flex justify-between items-center border-b border-white/5 bg-[#02010a]/50 backdrop-blur-md">
          <Logo />
          <button onClick={closeMenu} className="p-1.5 text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-full space-y-4 px-6 text-center">
          {menuItems.map((item, idx) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`text-[12px] font-modern font-black uppercase tracking-[0.3em] border border-white/5 bg-white/5 px-8 py-5 rounded-xl w-full max-w-[280px] hover:bg-indigo-600/20 transition-all ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${idx * 50}ms`, color: activeSection === item.id ? '#6366f1' : 'white' }}
            >
              {item.name}
            </a>
          ))}
          
          <div className={`pt-6 flex flex-col items-center gap-6 transition-all duration-700 delay-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
            <button 
              onClick={() => { closeMenu(); onOpenTerminal(); }}
              className="px-12 py-5 bg-indigo-600 rounded-xl font-black text-[12px] uppercase tracking-[0.2em] text-white shadow-2xl shadow-indigo-500/30 active:scale-95 transition-transform"
            >
              Launch Terminal
            </button>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[7px] font-mono text-white/20 tracking-[0.4em] uppercase">System_Active // Port_Open</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
