
import React, { useState, useEffect } from 'react';
import { MOCK_FARMER, MOCK_EVENTS, getEventIcon } from '../constants';
import { AlertTriangle, CloudSun, MapPin, Search, ChevronRight, Play, Camera, Wind, Droplet } from 'lucide-react';
import { farmAdvisor, animateField, detectPests } from '../services/gemini';

const FarmerDashboard: React.FC = () => {
  const [advice, setAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [pestResult, setPestResult] = useState<string | null>(null);
  const [isDetectingPest, setIsDetectingPest] = useState(false);

  useEffect(() => {
    handleGetAdvice();
  }, []);

  const handleGetAdvice = async () => {
    setLoadingAdvice(true);
    const result = await farmAdvisor(`I am a farmer in ${MOCK_FARMER.location} growing ${MOCK_FARMER.cropType}. What is the weather-driven spray window and planting advice for today?`);
    setAdvice(result.text);
    setLoadingAdvice(false);
  };

  const handlePestCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsDetectingPest(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const b64 = reader.result as string;
      const result = await detectPests(b64);
      setPestResult(result);
      setIsDetectingPest(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Hello, {MOCK_FARMER.name}</h2>
            <div className="flex items-center text-slate-500 text-sm mt-1"><MapPin size={14} className="mr-1" />{MOCK_FARMER.location}</div>
          </div>
          <div className="text-right">
            <div className="text-emerald-600 font-bold text-lg">{MOCK_FARMER.inputTrustScore}</div>
            <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Trust Score</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Soil" value="32%" color="text-blue-600" />
          <StatCard label="Nitrogen" value="High" color="text-emerald-600" />
          <StatCard label="Pest Risk" value="Low" color="text-amber-600" />
        </div>
      </section>

      {/* Pest Detection Section */}
      <section className="bg-red-50 p-5 rounded-2xl border border-red-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-600" size={20} />
            <h3 className="font-bold text-red-800">Pest Detection</h3>
          </div>
          <label className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer active:scale-95 transition-transform">
            <Camera size={14} /> SCAN CROP
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePestCapture} />
          </label>
        </div>
        
        {isDetectingPest ? (
          <div className="bg-white p-4 rounded-xl flex items-center justify-center gap-3 animate-pulse border border-red-100">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping" />
            <span className="text-sm text-red-800 font-medium">Analyzing field samples...</span>
          </div>
        ) : pestResult ? (
          <div className="bg-white p-4 rounded-xl border border-red-100 shadow-inner">
            <div className="prose prose-sm text-red-900 leading-relaxed">{pestResult}</div>
            <button onClick={() => setPestResult(null)} className="mt-3 text-[10px] font-bold text-red-600 uppercase">Clear Scan</button>
          </div>
        ) : (
          <p className="text-xs text-red-700">Submit a photo to identify threats instantly.</p>
        )}
      </section>

      {/* Layer 1: Intelligence - Advisor */}
      <section className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CloudSun className="text-emerald-700" size={20} />
            <h3 className="font-bold text-emerald-800">Weather & Advisory</h3>
          </div>
          <div className="flex gap-3 text-[10px] font-bold text-emerald-600 uppercase">
             <span className="flex items-center gap-1"><Wind size={12} /> 12km/h</span>
             <span className="flex items-center gap-1"><Droplet size={12} /> 65%</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl text-sm text-slate-700 shadow-inner min-h-[80px]">
          {loadingAdvice ? <div className="animate-pulse">Loading advisory...</div> : <div className="prose prose-sm max-w-none">{advice}</div>}
        </div>
      </section>

      {/* Veo Visualization Simulation */}
      <section className="bg-slate-800 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-bold mb-2">Future Harvest Vision</h3>
          {videoUrl ? <video src={videoUrl} controls className="w-full rounded-lg mb-4" /> : isGeneratingVideo ? (
            <div className="w-full h-40 bg-slate-700 rounded-lg flex flex-col items-center justify-center gap-2"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <label className="block w-full h-40 bg-slate-700 rounded-lg border-2 border-dashed border-slate-600 flex flex-col items-center justify-center cursor-pointer">
              <Play className="mb-2 text-slate-500" /><span className="text-sm">Simulate Field Growth</span><input type="file" className="hidden" accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0]; if (file) {
                  setIsGeneratingVideo(true);
                  const reader = new FileReader(); reader.onloadend = async () => { const url = await animateField(reader.result as string); setVideoUrl(url); setIsGeneratingVideo(false); }; reader.readAsDataURL(file);
                }
              }} />
            </label>
          )}
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="bg-slate-50 p-3 rounded-xl">
    <div className="text-[10px] uppercase text-slate-400 font-bold tracking-tighter mb-1">{label}</div>
    <div className={`text-lg font-bold ${color}`}>{value}</div>
  </div>
);

export default FarmerDashboard;
