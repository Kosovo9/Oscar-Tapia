
import React from 'react';
import { Language, translations } from '../types';

interface FooterProps { lang: Language; }

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="bg-black py-24 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center md:items-center gap-16">
        
        {/* Branding Symmetrical to Logo */}
        <div className="flex flex-col items-center md:items-start gap-4">
           <div className="flex items-center gap-5">
             <div className="w-14 h-14 border-2 border-[#C5A059] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.1)]">
               <span className="text-[#C5A059] text-2xl font-black">OT</span>
             </div>
             <div className="flex flex-col">
               <span className="text-white uppercase tracking-[0.4em] font-black text-xs">Landgrow</span>
               <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Oscar Tapia</span>
             </div>
           </div>
        </div>

        {/* Centered Symmetrical Quote */}
        <div className="text-center max-w-lg">
          <p className="text-white/60 text-lg md:text-xl italic serif leading-relaxed">
            "{t.footer_tagline}"
          </p>
        </div>

        {/* Rights & Identity */}
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.4em] text-white/30 font-black">
             <span>Logistics Hub</span>
             <span>Excellence</span>
          </div>
          <div className="text-center md:text-right">
            <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-black block">© {new Date().getFullYear()} Landgrow México.</span>
            <span className="text-[9px] text-white/20 tracking-[0.2em] uppercase font-bold mt-2 block">Brand Identity Protected.</span>
          </div>
        </div>
      </div>

      {/* Background Symmetrical Decoration */}
      <div className="absolute -bottom-10 -left-10 text-[25vw] font-black text-white/[0.01] pointer-events-none select-none uppercase tracking-tighter leading-none">
        OT
      </div>
    </footer>
  );
};

export default Footer;
