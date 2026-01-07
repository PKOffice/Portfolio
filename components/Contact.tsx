
import React, { useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, MapPin, Phone, Send, Terminal, Twitter, Shield, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Entrance animation for the entire section
      gsap.from(".contact-content", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Staggered items inside contact
      gsap.from(".contact-node", {
        x: -30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // Form reveal from right
      gsap.from(formRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-[#02010a] relative overflow-hidden scroll-mt-24">
      {/* Background Cinematic Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)] blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header - Section 05 */}
        <div className="max-w-4xl mb-12 md:mb-16 lg:mb-20 text-center md:text-left contact-content">
          <span className="text-indigo-500 font-black tracking-[0.5em] uppercase text-[9px] md:text-[10px] mb-4 block">Section 05 // Connection Node</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-none mb-6 uppercase">INITIATE <br/><span className="text-white/10 italic font-light">LINK_SYNC.</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Communications Interface */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4 contact-content">
              <p className="text-sm md:text-lg text-white/40 font-light leading-relaxed max-w-md">
                Currently open for architectural consulting, <span className="text-white font-medium">Java Full Stack</span> lead roles, and innovative technical collaborations.
              </p>
            </div>

            {/* Communication Nodes Mapping */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Secure_Mail', value: 'prathmeshkamble885@gmail.com', link: 'mailto:prathmeshkamble885@gmail.com' },
                { icon: Phone, label: 'Terminal_Link', value: '+91 8830160884', link: 'tel:+918830160884' },
                { icon: MapPin, label: 'Station_Coords', value: 'Bengaluru, KA, India', link: '#' }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.link}
                  className="contact-node block group p-6 glass rounded-[32px] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
                     <item.icon size={120} />
                  </div>
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 text-white/30 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-500 shadow-2xl">
                      <item.icon size={24} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[8px] font-mono text-white/20 tracking-[0.3em] uppercase mb-1 font-bold">{item.label}</div>
                      <div className="text-base md:text-xl font-black tracking-tight truncate group-hover:text-indigo-400 transition-colors uppercase">{item.value}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Network Social Nodes */}
            <div className="contact-content flex items-center gap-6 pt-4">
               <div className="text-[8px] font-mono text-white/10 tracking-[0.4em] uppercase font-bold">Network_Grid:</div>
               <div className="flex gap-4">
                  {[
                    { icon: Github, url: 'https://github.com/Prathmesh-Kamble-10' },
                    { icon: Linkedin, url: 'https://in.linkedin.com/in/prathmesh-kamble-4032b21a3' },
                    { icon: Twitter, url: 'https://x.com/PrathmeshNaray1' }
                  ].map((social, i) => (
                    <a 
                      key={i} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/30 hover:text-white hover:bg-indigo-600 hover:-translate-y-1 transition-all"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
               </div>
            </div>
          </div>

          {/* Right Column: Transmission Module (Form) */}
          <div className="lg:col-span-7" ref={formRef}>
            <div className="glass p-8 md:p-12 lg:p-16 rounded-[40px] md:rounded-[56px] border border-white/5 relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
               
               <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.02] pointer-events-none">
                  <span className="text-[12rem] md:text-[20rem] font-black font-heading leading-none">C5</span>
               </div>
               
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
               
               <form className="relative z-10 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 font-mono text-[9px] md:text-[10px] text-white/30 tracking-[0.3em] uppercase font-black">
                        <Terminal size={12} className="text-indigo-500" /> Identity_Handle
                      </label>
                      <input 
                        type="text" 
                        placeholder="NAME_OR_ENTITY" 
                        className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-indigo-500 transition-all text-sm font-black tracking-widest uppercase placeholder:text-white/5" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 font-mono text-[9px] md:text-[10px] text-white/30 tracking-[0.3em] uppercase font-black">
                        <Shield size={12} className="text-cyan-400" /> Secure_Portal
                      </label>
                      <input 
                        type="email" 
                        placeholder="PROTOCOL@DOMAIN.NET" 
                        className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-indigo-500 transition-all text-sm font-black tracking-widest uppercase placeholder:text-white/5" 
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="font-mono text-[9px] md:text-[10px] text-white/30 tracking-[0.3em] uppercase font-black block">Payload_Description</label>
                    <textarea 
                      rows={4} 
                      placeholder="ENTER_TRANSMISSION_DATA..." 
                      className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-indigo-500 transition-all resize-none text-sm font-black tracking-widest uppercase placeholder:text-white/5"
                    ></textarea>
                  </div>
                  
                  <div className="pt-6">
                    <button type="button" className="group w-full py-6 md:py-8 bg-white text-black rounded-3xl font-black font-heading text-xs md:text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95">
                       EXECUTE_SYNC <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    
                    <div className="mt-10 flex flex-wrap justify-between items-center gap-4 opacity-20">
                       <div className="flex gap-6">
                          <span className="text-[8px] font-mono tracking-widest uppercase font-bold">Encrypted_TLS_1.3</span>
                          <span className="text-[8px] font-mono tracking-widest uppercase font-bold">Core_ID: PK_CORE_V3</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-[8px] font-mono uppercase font-bold">Buffer_Ready</span>
                       </div>
                    </div>
                  </div>
               </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
