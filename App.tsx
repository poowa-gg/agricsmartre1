
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { UserRole } from './types';
import VoiceAssistant from './components/VoiceAssistant';
import USSDSimulator from './components/USSDSimulator';
import { Smartphone } from 'lucide-react';

// Views
import FarmerDashboard from './views/FarmerDashboard';
import CreditScoreScreen from './views/CreditScoreScreen';
import CooperativeFinder from './views/CooperativeFinder';
import AdminDashboard from './views/AdminDashboard';
import MinistryDashboard from './views/MinistryDashboard';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.FARMER);
  const [isUSSDOpen, setIsUSSDOpen] = useState(false);

  return (
    <HashRouter>
      <Layout role={role} setRole={setRole}>
        <Routes>
          <Route path="/" element={
            role === UserRole.FARMER ? <FarmerDashboard /> :
            role === UserRole.COOP_ADMIN ? <AdminDashboard /> :
            role === UserRole.MINISTRY_ADMIN ? <MinistryDashboard /> :
            <LenderView />
          } />
          <Route path="/credit" element={<CreditScoreScreen />} />
          <Route path="/coop" element={<CooperativeFinder />} />
          <Route path="/oversight" element={<MinistryDashboard />} />
          <Route path="/market" element={<MarketplacePlaceholder />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
      
      {/* Simulation Tools */}
      <VoiceAssistant />
      <USSDSimulator isOpen={isUSSDOpen} onClose={() => setIsUSSDOpen(false)} />
      
      <button 
        onClick={() => setIsUSSDOpen(true)}
        className="fixed bottom-24 left-6 z-[60] bg-slate-800 text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
        title="Simulate Offline USSD"
      >
        <Smartphone size={24} />
      </button>
    </HashRouter>
  );
};

const MarketplacePlaceholder = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
    <div className="bg-slate-100 p-8 rounded-full"><span className="text-4xl">🚜</span></div>
    <h2 className="text-2xl font-bold text-slate-800">Marketplace Network</h2>
    <p className="text-slate-500 max-w-xs">Connecting trusted cooperatives directly to wholesale buyers and export markets.</p>
    <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg">Coming Soon</button>
  </div>
);

const LenderView = () => (
  <div className="space-y-6">
    <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="relative z-10"><h2 className="text-3xl font-bold mb-2">Lender Portal</h2><p className="text-slate-400">Aggregated risk monitoring and portfolio performance.</p></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <LenderStat label="Total Disbursed" value="₦1.2B" change="+15% YoY" />
      <LenderStat label="Portfolio at Risk" value="1.2%" change="-0.4% MoM" />
      <LenderStat label="Active Facilities" value="48 Coops" change="+2 new" />
    </div>
  </div>
);

const LenderStat = ({ label, value, change }: { label: string; value: string; change: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{label}</div>
    <div className="text-3xl font-bold text-slate-800">{value}</div>
    <div className={`text-[10px] font-bold mt-2 ${change.includes('-') || change.includes('Risk') ? 'text-emerald-600' : 'text-blue-600'}`}>{change}</div>
  </div>
);

export default App;
