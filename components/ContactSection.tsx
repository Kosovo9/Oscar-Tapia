
import React from 'react';
import { Language } from '../types';

interface ContactSectionProps { lang: Language; }

const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const whatsappNumber = "523314666832";
  const linkedInUrl = "https://www.linkedin.com/in/oscar-tapia-landgrow";
  const newSiteUrl = "https://landgrow-2026-oscartapia.surge.sh/";

  return (
    <div className="relative py-12 md:py-24 bg-[#070D1E]">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Contact cards presented together in a balanced grid */}
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          {/* Identity Card */}
          <div className="lg:col-span-3 glass-card p-10 md:p-16 rounded-[3rem] border border-white/5 flex flex-col justify-between transition-all duration-700 hover:border-[#C5A059]/20">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 btn-gold rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-2xl">OT</div>
                <div>
                  <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight">Oscar Tapia</h3>
                  <p className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-black mt-2 opacity-80">Director Landgrow México</p>
                </div>
              </div>
              <p className="text-gray-400 text-lg md:text-2xl font-light serif italic leading-relaxed max-w-2xl">
                {lang === 'en' 
                  ? 'Personalized consulting for global-scale industrial security and specialized utility logistics.' 
                  : 'Consultoría personalizada para seguridad industrial a escala global y logística utilitaria especializada.'}
              </p>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row gap-6">
              <a 
                href={`https://wa.me/${whatsappNumber}`} 
                target="_blank" 
                className="btn-gold flex-1 px-10 py-5 rounded-2xl text-black font-black uppercase tracking-[0.3em] text-[10px] text-center shadow-2xl"
              >
                WhatsApp Direct
              </a>
              <a 
                href={linkedInUrl} 
                target="_blank" 
                className="btn-gold flex-1 px-10 py-5 rounded-2xl text-black font-black uppercase tracking-[0.3em] text-[10px] text-center shadow-2xl"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* QR Card */}
          <div className="lg:col-span-2 glass-card p-10 md:p-16 rounded-[3rem] border border-[#C5A059]/10 bg-[#C5A059]/[0.02] flex flex-col items-center justify-center text-center transition-all duration-700 hover:bg-[#C5A059]/[0.05]">
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="flex flex-col items-center gap-4 group">
                <div className="bg-[#E8D3A3] p-4 rounded-[2rem] shadow-2xl transition-all group-hover:bg-[#C5A059] group-hover:scale-105">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/${whatsappNumber}`} 
                    className="w-24 h-24 md:w-32 md:h-32 grayscale mix-blend-multiply opacity-90 transition-all group-hover:grayscale-0 group-hover:opacity-100"
                    alt="WhatsApp QR"
                  />
                </div>
                <span className="text-[8px] text-gray-500 font-black uppercase tracking-[0.3em]">Mobile Hub</span>
              </div>
              <div className="flex flex-col items-center gap-4 group">
                <div className="bg-[#E8D3A3] p-4 rounded-[2rem] shadow-2xl transition-all group-hover:bg-[#C5A059] group-hover:scale-105">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${newSiteUrl}`} 
                    className="w-24 h-24 md:w-32 md:h-32 grayscale mix-blend-multiply opacity-90 transition-all group-hover:grayscale-0 group-hover:opacity-100"
                    alt="Web QR"
                  />
                </div>
                <span className="text-[8px] text-gray-500 font-black uppercase tracking-[0.3em]">Digital Card</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-white text-xl font-black uppercase tracking-[0.4em]">Landgrow</p>
              <p className="text-gray-600 text-[9px] uppercase tracking-[0.3em] font-black">2026 Strategy • HQ GDL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
