
import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  toggleLang: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, toggleLang }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5 px-6 md:px-12 py-5 flex justify-between items-center">
      {/* Brand Identity */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="w-10 h-10 btn-gold rounded-full flex items-center justify-center border border-[#C5A059]/30 shadow-lg">
          <span className="text-black font-black text-base">OT</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[10px] tracking-[0.3em] uppercase font-black text-white">Landgrow</span>
          <span className="text-[8px] text-[#C5A059] uppercase tracking-[0.3em] font-bold mt-1">Oscar Tapia</span>
        </div>
      </div>

      {/* Navigation - Balanced Typography */}
      <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex gap-12 text-[10px] uppercase tracking-[0.5em] font-black text-white/70">
        <a href="#presentation" className="hover:text-[#C5A059] hover:tracking-[0.6em] transition-all">
          {lang === 'en' ? 'Vision' : 'Visión'}
        </a>
        <a href="#sectors" className="hover:text-[#C5A059] hover:tracking-[0.6em] transition-all">
          {lang === 'en' ? 'Sectors' : 'Sectores'}
        </a>
        <a href="#clients" className="hover:text-[#C5A059] hover:tracking-[0.6em] transition-all">
          {lang === 'en' ? 'Partners' : 'Aliados'}
        </a>
      </nav>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleLang}
          className="text-[11px] font-black px-5 py-2.5 rounded-full border border-white/10 hover:border-[#C5A059]/40 transition-all uppercase tracking-[0.2em] text-gray-300 hover:text-white"
        >
          {lang === 'en' ? 'EN / ES' : 'ES / EN'}
        </button>
        <a 
          href="https://wa.me/5213314666832"
          target="_blank"
          className="btn-gold px-6 py-2.5 rounded-full text-black text-[9px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all"
        >
          {lang === 'en' ? 'Connect' : 'Contacto'}
        </a>
      </div>
    </header>
  );
};

export default Header;
