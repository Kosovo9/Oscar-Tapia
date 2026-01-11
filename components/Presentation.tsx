
import React from 'react';
import { Language, translations } from '../types';

interface PresentationProps { lang: Language; }

const Presentation: React.FC<PresentationProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="relative py-24 md:py-40">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="flex items-center gap-8 mb-10">
             <div className="h-px w-14 bg-[#C5A059]/30"></div>
             <h3 className="text-[#C5A059] text-[12.5px] md:text-[15px] uppercase tracking-[0.75em] font-black">
               {lang === 'en' ? 'Identity' : 'Identidad'}
             </h3>
             <div className="h-px w-14 bg-[#C5A059]/30"></div>
          </div>
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-12">
            {lang === 'en' ? 'Professional Vision' : 'Visión Profesional'}
          </h2>
          <p className="text-xl md:text-3xl text-gray-300 font-light serif italic leading-relaxed max-w-3xl mx-auto">
            {t.presentation_body}
          </p>
        </div>

        {/* Feature Grid - Unified Typography */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {/* Mission Card */}
          <div className="p-10 md:p-14 glass-card rounded-[2.5rem] border border-white/5 flex flex-col justify-start min-h-[320px]">
             <span className="text-[#C5A059] text-[11px] font-black uppercase tracking-[0.5em] mb-10 block opacity-70">
               {lang === 'en' ? 'Mission' : 'Misión'}
             </span>
             <p className="text-white text-lg md:text-2xl font-light serif italic leading-relaxed">
               {t.presentation_vision_text}
             </p>
          </div>

          {/* Expertise Card - Matched to Mission typography style */}
          <div className="p-10 md:p-14 glass-card rounded-[2.5rem] border border-[#C5A059]/10 bg-[#C5A059]/[0.02] flex flex-col justify-start min-h-[320px]">
             <span className="text-[#C5A059] text-[11px] font-black uppercase tracking-[0.5em] mb-10 block opacity-70">
               {lang === 'en' ? 'Expertise' : 'Expertise'}
             </span>
             <p className="text-white text-lg md:text-2xl font-light serif italic leading-relaxed">
                {lang === 'en' 
                  ? 'Strategic Industrial Sourcing specialized in premium high-scale logistics and protective wear for elite Mexican industries.' 
                  : 'Insumos Industriales Estratégicos especializados en logística premium de gran escala y equipo de protección para industrias de élite.'}
             </p>
          </div>
        </div>

        {/* Balanced Stats Table */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-white/5">
          {[
            { val: '15+', label: lang === 'en' ? 'Experience' : 'Experiencia' },
            { val: '100+', label: lang === 'en' ? 'Partners' : 'Aliados' },
            { val: 'MX', label: lang === 'en' ? 'Presence' : 'Presencia' },
            { val: 'ISO', label: lang === 'en' ? 'Quality' : 'Calidad' }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <span className="block text-4xl md:text-6xl font-bold gold-gradient tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-500">
                {item.val}
              </span>
              <span className="block text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-gray-500 font-black">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Presentation;
