
import React from 'react';
import { Language, translations } from '../types';

const sectors = [
  { 
    id: 'industry', 
    img: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800',
    gridClass: 'lg:col-span-1'
  },
  { 
    id: 'mining', 
    img: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&q=80&w=1200',
    gridClass: 'lg:col-span-1',
    isFeatured: true
  },
  { 
    id: 'field', 
    img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800',
    gridClass: 'lg:col-span-1'
  },
  { 
    id: 'construction', 
    img: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=1200',
    gridClass: 'lg:col-span-1'
  }
];

const SectorsSection: React.FC<{lang: Language}> = ({lang}) => {
  const t = translations[lang];
  
  return (
    <div className="relative overflow-hidden py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-8 mb-10">
            <div className="h-px w-14 bg-[#C5A059]/40"></div>
            <h3 className="text-[#C5A059] text-[12.5px] md:text-[15px] uppercase tracking-[0.75em] font-black">
              {t.sectors_title}
            </h3>
            <div className="h-px w-14 bg-[#C5A059]/40"></div>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-6">
            {lang === 'en' ? 'Core Expertise' : 'Expertise Central'}
          </h2>
          <p className="text-gray-400 text-lg font-light serif italic opacity-70 max-w-2xl mx-auto">
            {t.sectors_tagline}
          </p>
        </div>

        {/* Unified single-row layout for sectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector) => (
            <div 
              key={sector.id} 
              className={`relative group overflow-hidden rounded-[2.5rem] h-[35rem] glass-card border transition-all duration-700 ${sector.gridClass} ${sector.isFeatured ? 'border-[#C5A059]/30 shadow-[0_0_40px_rgba(197,160,89,0.1)]' : 'border-white/5'}`}
            >
              {/* Feature Badge */}
              {sector.isFeatured && (
                <div className="absolute top-6 left-6 z-20">
                  <span className="bg-[#C5A059] text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                    Focus Sector
                  </span>
                </div>
              )}

              <img 
                src={sector.img} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale group-hover:grayscale-0" 
                alt={sector.id}
                loading="lazy"
              />
              
              {/* Refined gradient to ensure text readability without hiding the image completely */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
              
              <div className="absolute bottom-10 left-10 right-10 z-10">
                <div className="space-y-2 transform transition-all duration-500 group-hover:-translate-y-2">
                  <span className="block text-[#C5A059] font-black uppercase tracking-[0.4em] text-[10px] opacity-70">
                    {lang === 'en' ? 'Industrial Segment' : 'Segmento Industrial'}
                  </span>
                  <span className="block text-white font-black uppercase tracking-[0.1em] text-2xl md:text-3xl leading-tight">
                    {(t as any)[`sectors_${sector.id}`]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectorsSection;
