
import React, { useRef, useState, useEffect } from 'react';
import { Language, translations } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio interaction required."));
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background is now global in App.tsx */}
      
      {/* Premium Cinematic Audio Track */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://cdn.pixabay.com/audio/2022/03/15/audio_517743d501.mp3" 
      />

      <div className="relative z-10 text-center px-6 w-full max-w-7xl pt-20">
        {/* Identifier Badge */}
        <div className="inline-flex items-center gap-4 mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="h-px w-6 md:w-16 bg-[#C5A059]/40"></div>
          <span className="text-[#C5A059] text-[10px] md:text-xs uppercase tracking-[0.5em] font-black">
            Landgrow Industrial • Guadalajara
          </span>
          <div className="h-px w-6 md:w-16 bg-[#C5A059]/40"></div>
        </div>
        
        {/* Main Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold mb-6 gold-gradient leading-[0.85] tracking-tighter drop-shadow-2xl px-4">
          {t.hero_title}
        </h1>
        
        {/* Subtitle/Tagline */}
        <p className="text-lg sm:text-xl md:text-3xl text-white/80 font-light mb-10 italic serif max-w-3xl mx-auto leading-tight animate-fade-up" style={{ animationDelay: '400ms' }}>
          "{t.hero_tagline}"
        </p>

        {/* Corporate Label */}
        <p className="text-[9px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.4em] mb-12 opacity-80 animate-fade-up" style={{ animationDelay: '600ms' }}>
          {t.hero_subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-up" style={{ animationDelay: '800ms' }}>
          <a 
            href="mailto:oscar.tapia@landgrow.mx" 
            className="btn-gold px-12 py-5 rounded-full w-full sm:w-auto text-black font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all"
          >
             {lang === 'en' ? 'Inquiry' : 'Contacto'}
          </a>
          <a 
            href="https://landgrow.mx/wp-content/uploads/2025/08/LANDGROW_CARD-2025.pdf" 
            target="_blank" 
            className="px-12 py-5 rounded-full w-full sm:w-auto border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C5A059]/30 transition-all text-white font-black uppercase tracking-[0.3em] text-[10px] backdrop-blur-xl flex items-center justify-center gap-3"
          >
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12l-5-5h10l-5 5z"/></svg>
             {lang === 'en' ? 'Portfolio' : 'Portafolio'}
          </a>
        </div>

        {/* Interactive Audio Visualizer Toggle */}
        <button 
          onClick={toggleAudio}
          className="mt-24 md:mt-32 group flex flex-col items-center gap-4 mx-auto transition-all"
        >
          <div className="flex gap-1.5 h-6 items-center">
            {[1,2,3,4,5,6,7].map(i => (
              <div 
                key={i} 
                className={`w-[3px] bg-[#C5A059] rounded-full transition-all duration-300 ${isAudioPlaying ? 'animate-visualizer' : 'h-1 opacity-30'}`} 
                style={{ 
                  animationDelay: `${i * 150}ms`,
                  boxShadow: isAudioPlaying ? '0 0 10px rgba(197, 160, 89, 0.5)' : 'none'
                }}
              />
            ))}
          </div>
          <span className={`text-[10px] uppercase tracking-[0.6em] font-black transition-all ${isAudioPlaying ? 'text-[#C5A059] opacity-100' : 'text-white/20'}`}>
            {isAudioPlaying ? (lang === 'en' ? 'Audio On' : 'Audio Activo') : (lang === 'en' ? 'Play Experience' : 'Activar Experiencia')}
          </span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes visualizer {
          0%, 100% { height: 4px; }
          50% { height: 24px; }
        }
        .animate-visualizer {
          animation: visualizer 0.8s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default Hero;
