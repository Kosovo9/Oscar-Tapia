
import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Language } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Presentation from './components/Presentation';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ClientsSection from './components/ClientsSection';
import SectorsSection from './components/SectorsSection';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');

  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang') as Language;
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'es' : 'en';
    setLang(nextLang);
    localStorage.setItem('app_lang', nextLang);
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-[#C5A059] selection:text-black bg-[#0A1128] relative">
        {/* Global Architectural Background - Visibility increased to 0.77 (approx 20% more than previous 0.57) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=90&w=2400')] bg-cover bg-center animate-globalKenBurns opacity-[0.77] scale-105"
            style={{ filter: 'grayscale(100%) brightness(0.25) contrast(1.15)' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/95 via-transparent to-[#0A1128]/95 z-1"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A1128_100%)] opacity-80 z-1"></div>
        </div>

        <Header lang={lang} toggleLang={toggleLang} />
        
        <main className="flex-grow relative z-10">
          <section id="hero">
            <Hero lang={lang} />
          </section>

          <section id="presentation" className="bg-[#070D1E]/80 backdrop-blur-sm border-y border-white/5">
            <Presentation lang={lang} />
          </section>

          <section id="sectors" className="bg-[#0A1128]/60 backdrop-blur-sm">
            <SectorsSection lang={lang} />
          </section>

          <section id="clients" className="bg-[#070D1E]/90 backdrop-blur-sm">
            <ClientsSection lang={lang} />
          </section>

          <section id="contact" className="bg-[#070D1E]/80 backdrop-blur-sm">
            <ContactSection lang={lang} />
          </section>
        </main>

        <Footer lang={lang} />

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes globalKenBurns {
            0% { transform: scale(1.05) translate(0, 0); }
            100% { transform: scale(1.15) translate(-1%, -1%); }
          }
          .animate-globalKenBurns {
            animation: globalKenBurns 120s ease-in-out infinite alternate;
          }
        `}} />
      </div>
    </HashRouter>
  );
};

export default App;
