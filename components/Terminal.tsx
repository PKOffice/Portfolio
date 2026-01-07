
import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'System initialization...',
    'Loading PK_CORE_V2.5...',
    'Establishing secure link...',
    'Welcome to the PK Command Line. Type "help" for commands.'
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(containerRef.current, 
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string) => {
    const args = cmd.toLowerCase().trim().split(' ');
    const base = args[0];
    const text = args.slice(1).join(' ');

    let response = '';
    
    switch (base) {
      case 'help':
        response = `Available commands:
  - info: Display developer profile
  - contact: Show social and communication nodes
  - echo [text]: Repeat input text
  - clear: Purge terminal history
  - exit: Terminate session`;
        break;
      case 'info':
        response = `DESIGNATION: Java Developer @ Tata Electronics
BIO: Synthesizing complex Java ecosystems with high-fidelity React interfaces. Focused on architectural resilience and system performance.
LOCATION: Bengaluru, India`;
        break;
      case 'contact':
        response = `COMMUNICATION NODES:
  - Email: prathmeshkamble885@gmail.com
  - LinkedIn: linkedin.com/in/prathmesh-kamble-4032b21a3
  - GitHub: github.com/Prathmesh-Kamble-10
  - Twitter: x.com/PrathmeshNaray1
  - Phone: +91 8830160884`;
        break;
      case 'echo':
        response = text || 'Echo what? (usage: echo hello world)';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onClose();
        return;
      case '':
        return;
      default:
        response = `Command not found: ${base}. Type "help" for a list of commands.`;
    }

    setHistory(prev => [...prev, `> ${cmd}`, response]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-[#02010a]/60 backdrop-blur-sm">
      <div 
        ref={containerRef}
        className="w-full max-w-4xl h-[60vh] md:h-[70vh] glass rounded-2xl md:rounded-3xl border border-white/10 flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#0a0a15] px-4 md:px-6 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <TerminalIcon size={12} className="text-indigo-400" />
              PK_TERMINAL // SESSION_01
            </div>
          </div>
          <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Console Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-8 font-mono text-[10px] md:text-xs text-green-400/90 space-y-2 selection:bg-green-500 selection:text-black"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap leading-relaxed opacity-90">
              {line}
            </div>
          ))}
          
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
            <span className="text-indigo-400 font-bold">prathmesh@narayan:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-green-400/90 caret-white"
              autoFocus
            />
          </form>
        </div>

        {/* Footer Status */}
        <div className="bg-[#0a0a15]/50 px-6 py-2 border-t border-white/5 flex justify-between items-center opacity-40">
           <div className="text-[7px] md:text-[8px] font-mono tracking-widest uppercase">Status: Connected</div>
           <div className="text-[7px] md:text-[8px] font-mono tracking-widest uppercase">Port: 8080</div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
