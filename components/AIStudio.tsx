
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Language } from '../types';

interface AIStudioProps {
  lang: Language;
}

const AIStudio: React.FC<AIStudioProps> = ({ lang }) => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image || !prompt) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType } },
            { text: `Edit this professional portrait: ${prompt}. Maintain identity, keep it high-end and luxurious.` }
          ]
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setResult(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (err) {
      console.error(err);
      alert(lang === 'en' ? 'Failed to edit image. Check your API key or connection.' : 'Error al editar la imagen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">
      <div className="glass-card p-8 rounded-2xl border border-white/5">
        <h4 className="text-xl font-bold mb-6 text-white uppercase tracking-widest border-b border-[#C5A059]/20 pb-4">
          {lang === 'en' ? 'Your Identity' : 'Tu Identidad'}
        </h4>
        
        {!image ? (
          <label className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
            <svg className="w-12 h-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-400">
              {lang === 'en' ? 'Upload high-res portrait' : 'Subir retrato de alta resolución'}
            </span>
            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
          </label>
        ) : (
          <div className="relative h-80 w-full group overflow-hidden rounded-xl">
            <img src={image} className="h-full w-full object-cover" alt="Uploaded" />
            <button 
              onClick={() => {setImage(null); setResult(null);}}
              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black text-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="mt-8 space-y-4">
          <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold">
            {lang === 'en' ? 'AI Enhancement Request' : 'Solicitud de Mejora IA'}
          </label>
          <input 
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={lang === 'en' ? "e.g., 'Make it look like a cinematic editorial'" : "ej. 'Dale un toque editorial cinematográfico'"}
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059] transition-all"
          />
          <button 
            disabled={!image || !prompt || loading}
            onClick={handleGenerate}
            className="w-full btn-gold px-6 py-4 rounded text-black font-bold uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (lang === 'en' ? 'Mastering...' : 'Masterizando...') : (lang === 'en' ? 'Generate Luxury Edit' : 'Generar Edición de Lujo')}
          </button>
        </div>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col justify-center min-h-[500px]">
        <h4 className="text-xl font-bold mb-6 text-white uppercase tracking-widest border-b border-[#C5A059]/20 pb-4">
          {lang === 'en' ? 'The Reveal' : 'La Revelación'}
        </h4>
        
        {result ? (
          <div className="space-y-6">
            <img src={result} className="w-full rounded-xl shadow-2xl" alt="Result" />
            <a 
              href={result} 
              download="oscar-tapia-portrait.png"
              className="block text-center border border-[#C5A059]/30 text-[#C5A059] px-6 py-3 rounded hover:bg-[#C5A059] hover:text-black transition-all font-bold uppercase text-xs tracking-widest"
            >
              {lang === 'en' ? 'Download for Profile' : 'Descargar para Perfil'}
            </a>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 border-2 border-[#C5A059]/20 border-t-[#C5A059] rounded-full mx-auto mb-6 animate-spin" style={{ animationDuration: '3s' }}></div>
            <p className="text-gray-500 italic serif text-lg">
              {loading ? (lang === 'en' ? 'The AI is refining your image...' : 'La IA está refinando tu imagen...') : 
                (lang === 'en' ? 'Awaiting your creative input' : 'Esperando tu entrada creativa')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIStudio;
