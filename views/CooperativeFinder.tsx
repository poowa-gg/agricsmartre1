
import React, { useState } from 'react';
import { MOCK_COOPERATIVES } from '../constants';
import { Star, Users, MapPin, ChevronRight, Search, Shield, Tag } from 'lucide-react';

const CooperativeFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  
  const filtered = MOCK_COOPERATIVES.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.specialization.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search grains, vegetables, or local hubs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-12 shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
      </div>

      <section className="space-y-4">
        <h3 className="font-bold text-slate-800 px-1">Results ({filtered.length})</h3>
        {filtered.map(coop => (
          <div key={coop.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 group">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-slate-800 text-lg group-hover:text-emerald-700 transition-colors">{coop.name}</h4>
                <div className="flex items-center text-slate-500 text-xs mt-1 gap-3">
                  <span className="flex items-center gap-1 font-bold text-amber-500"><Star size={12} fill="currentColor" /> {coop.rating}</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-bold"><Shield size={12} /> Min Score: {coop.minTrustScore}</span>
                </div>
              </div>
              {coop.bulkDiscount && (
                <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] font-black uppercase flex items-center gap-1">
                  <Tag size={10} /> Bulk Pricing
                </div>
              )}
            </div>
            
            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{coop.description}</p>

            <div className="mb-4 flex flex-wrap gap-2">
              {coop.preferences.map((pref, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-[10px] font-bold">#{pref}</span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{coop.memberCount} Members</div>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20">
                Join Group <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CooperativeFinder;
