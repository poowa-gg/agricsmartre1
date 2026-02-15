
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Globe, MessageCircle } from 'lucide-react';
import { initLiveVoice } from '../services/gemini';

const LANGUAGES = [
  { name: 'English', code: 'EN', greeting: 'How can I help you today?', status: 'Listening...' },
  { name: 'Yoruba', code: 'YO', greeting: 'Bawo ni mo ṣe le ràn ọ́ lọ́wọ́ lónìí?', status: 'Nífetí sí i...' },
  { name: 'Igbo', code: 'IG', greeting: 'Kedu ka m ga-esi nyere gị aka taa?', status: 'Na-ege ntị...' },
  { name: 'Hausa', code: 'HA', greeting: 'Yaya zan iya taimaka muku yau?', status: 'Sauraro...' },
  { name: 'French', code: 'FR', greeting: 'Comment puis-je vous aider aujourd\'hui?', status: 'À l\'écoute...' },
];

const VoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [language, setLanguage] = useState('English');
  const [transcript, setTranscript] = useState('');
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);

  const currentLangData = LANGUAGES.find(l => l.name === language) || LANGUAGES[0];

  // Effect to handle language switching while active
  useEffect(() => {
    if (isActive) {
      // Re-initialize session when language changes while active
      stopSession();
      startSession();
    }
  }, [language]);

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
    return buffer;
  };

  const decodeBase64 = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const handleAudioOutput = async (b64: string) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') await ctx.resume();
    
    const audioData = decodeBase64(b64);
    const audioBuffer = await decodeAudioData(audioData, ctx, 24000, 1);
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    const now = ctx.currentTime;
    nextStartTimeRef.current = Math.max(nextStartTimeRef.current, now);
    source.start(nextStartTimeRef.current);
    nextStartTimeRef.current += audioBuffer.duration;
  };

  const startSession = async () => {
    try {
      setTranscript('');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = initLiveVoice(handleAudioOutput, (text) => setTranscript(prev => prev + ' ' + text), language);
      sessionRef.current = await sessionPromise;
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const int16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
        const bytes = new Uint8Array(int16.buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        sessionRef.current?.sendRealtimeInput({ media: { data: btoa(binary), mimeType: 'audio/pcm;rate=16000' } });
      };
      
      source.connect(processor);
      processor.connect(inputCtx.destination);
      setIsActive(true);
    } catch (err) { 
      console.error(err); 
      setIsActive(false);
    }
  };

  const stopSession = () => {
    sessionRef.current?.close();
    sessionRef.current = null;
    setIsActive(false);
  };

  const toggleVoice = () => {
    if (isActive) {
      stopSession();
    } else {
      startSession();
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[60] flex flex-col items-end gap-3">
      {isActive && (
        <div className="bg-slate-900 text-white p-5 rounded-[2rem] shadow-2xl border border-emerald-500/30 max-w-xs animate-in slide-in-from-bottom-5 border-b-8 border-emerald-500">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live: {language}</span>
            </div>
            <button onClick={stopSession} className="text-slate-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
          
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{currentLangData.status}</p>
            <div className="bg-white/5 p-4 rounded-2xl min-h-[80px] border border-white/10">
              <p className="text-sm text-slate-300 leading-relaxed italic">
                {transcript.trim() || currentLangData.greeting}
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center gap-1.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1.5 h-4 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      )}
      
      {!isActive && (
        <div className="flex gap-1.5 bg-white p-1.5 rounded-full shadow-xl border border-slate-100 animate-in fade-in zoom-in duration-300">
          {LANGUAGES.map(lang => (
            <button 
              key={lang.code}
              onClick={() => setLanguage(lang.name)}
              title={lang.name}
              className={`text-[10px] font-black w-9 h-9 rounded-full transition-all flex items-center justify-center ${language === lang.name ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-110' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
            >
              {lang.code}
            </button>
          ))}
        </div>
      )}

      <button 
        onClick={toggleVoice} 
        className={`p-5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all active:scale-95 ${isActive ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-emerald-600 text-white hover:bg-emerald-500 hover:-translate-y-1'}`}
      >
        {isActive ? <MicOff size={28} /> : <Mic size={28} />}
      </button>
    </div>
  );
};

export default VoiceAssistant;
