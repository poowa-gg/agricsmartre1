
import React, { useState } from 'react';
import { Smartphone, X, Globe } from 'lucide-react';

type Language = 'EN' | 'YO' | 'IG' | 'HA';

type USSDScreen = 
  | 'lang' 
  | 'main' 
  | 'credit' 
  | 'credit_tips' 
  | 'credit_history'
  | 'coop' 
  | 'coop_details'
  | 'coop_reqs'
  | 'weather';

const USSDSimulator: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [screen, setScreen] = useState<USSDScreen>('lang');
  const [language, setLanguage] = useState<Language>('EN');
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleInput = () => {
    const val = input.trim();
    
    // Language Selection Screen
    if (screen === 'lang') {
      if (val === '1') { setLanguage('EN'); setScreen('main'); }
      else if (val === '2') { setLanguage('YO'); setScreen('main'); }
      else if (val === '3') { setLanguage('IG'); setScreen('main'); }
      else if (val === '4') { setLanguage('HA'); setScreen('main'); }
    } 
    // Main Menu
    else if (screen === 'main') {
      if (val === '1') setScreen('credit');
      else if (val === '2') setScreen('weather');
      else if (val === '3') setScreen('coop');
      else if (val === '9') setScreen('lang');
    }
    // Credit Submenu
    else if (screen === 'credit') {
      if (val === '1') setScreen('credit_tips');
      else if (val === '2') setScreen('credit_history');
      else if (val === '0') setScreen('main');
    }
    // Coop Submenu
    else if (screen === 'coop') {
      if (val === '1') setScreen('coop_details');
      else if (val === '2') setScreen('coop_reqs');
      else if (val === '0') setScreen('main');
    }
    // Generic back to main
    else if (val === '0') {
      setScreen('main');
    }

    setInput('');
  };

  const getGreeting = () => {
    switch (language) {
      case 'YO': return 'E kaabo si AgriSmart';
      case 'IG': return 'Nnoo na AgriSmart';
      case 'HA': return 'Barka da zuwa AgriSmart';
      default: return 'Welcome to AgriSmart';
    }
  };

  const getMenuText = () => {
    switch (language) {
      case 'YO': return ['Gbese & Igbeleye', 'Oju-ojo', 'Egbe Agbe', 'Ede'];
      case 'IG': return ['Ego mbinye', 'Ihu igwe', 'Otu koperativ', 'Asusu'];
      case 'HA': return ['Darajar Bashi', 'Yanayin Sama', 'Kungiyar Manoma', 'Harshe'];
      default: return ['Credit & Score', 'Weather', 'Cooperatives', 'Language'];
    }
  };

  const renderContent = () => {
    const menus = getMenuText();
    
    switch (screen) {
      case 'lang':
        return (
          <div className="space-y-1">
            <p className="font-bold underline mb-1">Select Language</p>
            <p>1. English</p>
            <p>2. Yoruba</p>
            <p>3. Igbo</p>
            <p>4. Hausa</p>
          </div>
        );
      case 'main':
        return (
          <div className="space-y-1">
            <p className="font-bold border-b border-emerald-900 pb-1 mb-1">{getGreeting()}</p>
            <p>1. {menus[0]}</p>
            <p>2. {menus[1]}</p>
            <p>3. {menus[2]}</p>
            <p>9. {menus[3]}</p>
          </div>
        );
      case 'credit':
        return (
          <div className="space-y-1">
            <p className="font-bold mb-1">Credit Engine</p>
            <p>Score: 710 (Good)</p>
            <p>Trust: 845 (Tier 1)</p>
            <p className="mt-2 text-[10px] text-emerald-400 opacity-70">--- Options ---</p>
            <p>1. Improvement Tips</p>
            <p>2. Recent Score Impact</p>
            <p>0. Back</p>
          </div>
        );
      case 'credit_tips':
        return (
          <div className="space-y-1">
            <p className="font-bold mb-1">Tips for You</p>
            <p>- Repay input loans early</p>
            <p>- Log 5+ farm activities/mo</p>
            <p>- Validate 1 neighbor</p>
            <p>0. Back</p>
          </div>
        );
      case 'credit_history':
        return (
          <div className="space-y-1">
            <p className="font-bold mb-1">History</p>
            <p>+15 (Dry Season Plan)</p>
            <p>-5 (Aphid Alert Latency)</p>
            <p>+10 (Verified Harvest)</p>
            <p>0. Back</p>
          </div>
        );
      case 'weather':
        return (
          <div className="space-y-1">
            <p className="font-bold mb-1">Live Update</p>
            <p>Loc: Oyo State</p>
            <p>Cond: High Humidity</p>
            <p>Spray Window: Open til 4PM</p>
            <p>0. Back</p>
          </div>
        );
      case 'coop':
        return (
          <div className="space-y-1">
            <p className="font-bold mb-1">Nearby Coops</p>
            <p>1. Unity Alliance (2km)</p>
            <p>2. Requirements for T1</p>
            <p>0. Back</p>
          </div>
        );
      case 'coop_details':
        return (
          <div className="space-y-1">
            <p className="font-bold mb-1">Unity Alliance</p>
            <p>Members: 154</p>
            <p>Benefit: 10% Seed Discount</p>
            <p>Join? (App req score 600)</p>
            <p>0. Back</p>
          </div>
        );
      case 'coop_reqs':
        return (
          <div className="space-y-1">
            <p className="font-bold mb-1">Coop Req's</p>
            <p>1. Min Trust Score 600</p>
            <p>2. Verified Farm Bio</p>
            <p>3. ₦5k Admin Fee</p>
            <p>0. Back</p>
          </div>
        );
      default:
        return <p>Invalid Screen</p>;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#121212] text-[#00ff41] font-mono p-6 rounded-3xl w-full max-w-xs border-4 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col">
        <div className="flex justify-between items-center mb-4 text-slate-500">
          <div className="flex items-center gap-1.5">
            <Smartphone size={16} />
            <span className="text-[10px] font-bold tracking-tighter uppercase">AgriSmart Offline</span>
          </div>
          <button onClick={onClose} className="hover:text-white transition-colors"><X size={18} /></button>
        </div>
        
        <div className="min-h-[140px] mb-6 text-sm leading-snug">
          {renderContent()}
        </div>
        
        <div className="flex gap-2 border-t border-slate-800 pt-4 mt-auto">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleInput()}
            placeholder="Type option..."
            className="flex-1 bg-slate-900 border-b-2 border-emerald-500 outline-none px-2 py-1 text-emerald-400 text-sm placeholder:text-emerald-900"
            autoFocus
          />
          <button 
            onClick={handleInput} 
            className="bg-emerald-600 text-slate-900 px-4 py-1.5 rounded font-black text-xs hover:bg-emerald-500 active:scale-95 transition-all"
          >
            SEND
          </button>
        </div>
        
        <div className="mt-4 flex justify-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
};

export default USSDSimulator;
