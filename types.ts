
export type Language = 'en' | 'es';

export interface Translation {
  hero_title: string;
  hero_subtitle: string;
  hero_tagline: string;
  presentation_title: string;
  presentation_body: string;
  presentation_vision_heading: string;
  presentation_vision_text: string;
  services_title: string;
  services_samples: string;
  services_advice: string;
  sectors_title: string;
  sectors_tagline: string;
  sectors_industry: string;
  sectors_field: string;
  sectors_mining: string;
  sectors_construction: string;
  clients_title: string;
  contact_me: string;
  download_pdf: string;
  whatsapp_us: string;
  footer_tagline: string;
  role_label: string;
  location_label: string;
  experience_label: string;
  partnership_label: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    hero_title: "Oscar Tapia",
    hero_subtitle: "Business Development Director | Landgrow México",
    hero_tagline: "Industrial Security, Redefined with Precision.",
    presentation_title: "Bilingual Corporate Vision",
    presentation_body: "At LANDGROW MÉXICO, we develop and market high-performance industrial utility wear. Our trajectory is defined by uncompromising quality and logistical excellence.",
    presentation_vision_heading: "Strategic Vision",
    presentation_vision_text: "To set the gold standard in industrial protection through specialized consulting and premium supplies, ensuring safety and dignity for Mexico's workforce.",
    services_title: "Specialized Concierge",
    services_samples: "Advanced textile curation and hardware samples tailored to your industry's specific risk profile.",
    services_advice: "Executive-level consulting for corporate identity and regulatory compliance in workwear.",
    sectors_title: "Strategic Sectors",
    sectors_tagline: "Protection where it matters most.",
    sectors_industry: "Heavy Industry",
    sectors_field: "Agro-Industrial",
    sectors_mining: "Mining & Extraction",
    sectors_construction: "Infrastructure",
    clients_title: "Institutional Partners",
    contact_me: "Establish a Connection",
    download_pdf: "Executive Brief (PDF)",
    whatsapp_us: "Direct WhatsApp Line",
    footer_tagline: "Excellence is not an act, but a habit.",
    role_label: "Development",
    location_label: "Guadalajara, MX",
    experience_label: "Years of Trust",
    partnership_label: "Landgrow"
  },
  es: {
    hero_title: "Oscar Tapia",
    hero_subtitle: "Director de Desarrollo de Negocios | Landgrow México",
    hero_tagline: "Seguridad Industrial, Redefinida con Precisión.",
    presentation_title: "Visión Corporativa Bilingüe",
    presentation_body: "En LANDGROW MÉXICO, desarrollamos y comercializamos ropa utilitaria industrial de alto rendimiento. Nuestra trayectoria se define por una calidad inquebrantable.",
    presentation_vision_heading: "Visión Estratégica",
    presentation_vision_text: "Establecer el estándar de oro en protección industrial mediante consultoría especializada e insumos premium, garantizando seguridad para la fuerza laboral.",
    services_title: "Concierge Especializado",
    services_samples: "Curaduría textil avanzada y muestras de herrajes adaptadas al perfil de riesgo específico de su industria.",
    services_advice: "Consultoría de nivel ejecutivo para identidad corporativa y cumplimiento normativo en uniformes.",
    sectors_title: "Sectores Estratégicos",
    sectors_tagline: "Protección donde más importa.",
    sectors_industry: "Industria Pesada",
    sectors_field: "Agro-Industrial",
    sectors_mining: "Minería y Extracción",
    sectors_construction: "Infraestructura",
    clients_title: "Aliados Institucionales",
    contact_me: "Establecer una Conexión",
    download_pdf: "Resumen Ejecutivo (PDF)",
    whatsapp_us: "Línea Directa WhatsApp",
    footer_tagline: "La excelencia no es un acto, sino un hábito.",
    role_label: "Desarrollo",
    location_label: "Guadalajara, MX",
    experience_label: "Años de Confianza",
    partnership_label: "Landgrow"
  }
};
