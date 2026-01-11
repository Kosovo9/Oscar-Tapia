
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Language } from '../types';

interface VoiceAssistantProps {
  lang: Language;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ lang }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const createBlob = (data: Float32Array) => {
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const startSession = async () => {
    try {
      setStatus('connecting');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('listening');
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((s) => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (msg) => {
            const audioStr = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioStr && audioContextRef.current) {
              setStatus('speaking');
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
              const buffer = await decodeAudioData(decode(audioStr), audioContextRef.current, 24000, 1);
              const source = audioContextRef.current.createBufferSource();
              source.buffer = buffer;
              source.connect(audioContextRef.current.destination);
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus('listening');
              };
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              // Fix: Added .current to sourcesRef to correctly access the Set
              sourcesRef.current.add(source);
            }
          },
          onerror: (e) => { console.error(e); setStatus('idle'); setIsActive(false); },
          onclose: () => { setStatus('idle'); setIsActive(false); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: `You are the AI Industrial Concierge for Landgrow México, representing Oscar Tapia. 
          Your focus is industrial supplies, corporate uniforms, and logistical solutions in Guadalajara. 
          You are professional, authoritative yet helpful. You help clients with high-scale needs for industry, field, mining, and construction.
          Oscar Tapia is the Business Development Director. Always mention the Landgrow quality and personalized advice.`
        }
      });
      sessionRef.current = await sessionPromise;
      setIsActive(true);
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  const stopSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    setIsActive(false);
    setStatus('idle');
  };

  return (
    <div className="glass-card p-10 md:p-20 rounded-[3rem] text-center relative overflow-hidden shadow-2xl border border-white/5">
      <div className="mb-12 flex justify-center">
        <div className={`w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center transition-all duration-700 ${
          status === 'listening' ? 'bg-green-500/5 scale-110 shadow-[0_0_80px_rgba(34,197,94,0.2)]' :
          status === 'speaking' ? 'bg-[#C5A059]/5 scale-110 shadow-[0_0_80px_rgba(197,160,89,0.2)]' :
          'bg-white/5'
        }`}>
          <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all ${
            isActive ? 'btn-gold shadow-2xl' : 'bg-white/10'
          }`}>
            <svg className={`w-8 h-8 md:w-12 md:h-12 ${isActive ? 'text-black animate-pulse' : 'text-white/30'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 005.93 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" />
            </svg>
          </div>
        </div>
      </div>

      <h4 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-[0.4em]">
        {status === 'idle' ? (lang === 'en' ? 'Voice Concierge' : 'Concierge de Voz') : 
         status === 'connecting' ? (lang === 'en' ? 'Securing Line...' : 'Asegurando Línea...') :
         status === 'listening' ? (lang === 'en' ? 'System Active' : 'Sistema Activo') :
         (lang === 'en' ? 'Concierge Transmitting' : 'Concierge Transmitiendo')}
      </h4>
      
      <p className="text-gray-400 mb-12 max-w-lg mx-auto serif italic text-lg opacity-60">
        {lang === 'en' ? 
          'Engage with Landgrow AI for real-time logistics and uniform consulting.' :
          'Interactúe con la IA de Landgrow para logística y consultoría de uniformes en tiempo real.'}
      </p>

      <button 
        onClick={isActive ? stopSession : startSession}
        className={`px-16 py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-500 ${
          isActive ? 'bg-red-500/10 border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white' : 'btn-gold text-black shadow-2xl'
        }`}
      >
        {isActive ? (lang === 'en' ? 'Terminate' : 'Terminar') : (lang === 'en' ? 'Engage Advisor' : 'Activar Asesor')}
      </button>

      {isActive && (
        <div className="mt-12 flex justify-center gap-2 h-10 items-center">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div 
              key={i} 
              className={`w-1 bg-[#C5A059] rounded-full transition-all duration-150 ${status === 'speaking' || status === 'listening' ? 'animate-bounce h-full' : 'h-2 opacity-20'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
