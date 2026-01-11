
import React from 'react';
import { Language, translations } from '../types';

const clients = [
  { name: "Diageo", logo: "https://logos-world.net/wp-content/uploads/2021/08/Diageo-Logo.png" },
  { name: "Tequila Don Julio", logo: "https://logos-world.net/wp-content/uploads/2020/12/Don-Julio-Logo.png" },
  { name: "Tequila Ocho", logo: "https://tequilaocho.com/wp-content/themes/tequila-ocho/img/logo-tequila-ocho.png" },
  { name: "Jose Cuervo", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Jose_Cuervo_logo.svg" },
  { name: "JLL", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/JLL_logo.svg/1200px-JLL_logo.svg.png" },
  { name: "Torex Gold Resources Inc.", logo: "https://www.torexgold.com/assets/images/logo.png" },
  { name: "Sanmina", logo: "https://logos-world.net/wp-content/uploads/2023/01/Sanmina-Logo.png" },
  { name: "Benchmark", logo: "https://www.benchmark.com/wp-content/uploads/2020/03/Benchmark_Logo_RGB_Blue.png" },
  { name: "Gobierno del Estado de Jalisco", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Escudo_de_Jalisco.svg/1200px-Escudo_de_Jalisco.svg.png" },
  { name: "Cuervo Herramientas", logo: "https://cuervoherramientas.com.mx/wp-content/uploads/2021/06/logo-cuervo.png" }
];

const ClientsSection: React.FC<{lang: Language}> = ({lang}) => {
  const t = translations[lang];
  
  return (
    <div className="relative overflow-hidden py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h3 className="text-[#C5A059] text-[15px] uppercase tracking-[0.7em] font-black mb-6">
            {t.clients_title}
          </h3>
          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter max-w-4xl mx-auto">
            {lang === 'en' ? 'Partners in Excellence' : 'Alianzas en Excelencia'}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {clients.map((client, i) => (
            <div 
              key={i} 
              className="group flex flex-col items-center justify-center transition-all duration-700"
            >
              <div className="w-full h-32 md:h-40 bg-[#E8D3A3] rounded-[2rem] flex items-center justify-center p-6 md:p-8 shadow-[0_15px_30px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-700 group-hover:bg-[#C5A059] group-hover:scale-105 group-hover:shadow-[0_20px_40px_rgba(197,160,89,0.2)]">
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="max-w-full max-h-full object-contain filter drop-shadow-sm brightness-95 group-hover:brightness-100 transition-all"
                  onError={(e) => {
                    (e.target as any).style.display = 'none';
                    const parent = (e.target as any).parentElement;
                    const span = document.createElement('span');
                    span.innerText = client.name;
                    span.className = "text-black font-black uppercase text-[12px] tracking-widest text-center leading-tight";
                    parent.appendChild(span);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsSection;
