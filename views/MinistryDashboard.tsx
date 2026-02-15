
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  ShieldCheck, AlertCircle, TrendingUp, Users, Map, 
  FileCheck, Zap, Globe, Award, ClipboardList, 
  ChevronRight, Filter, MessageSquare, Briefcase, 
  Download, ExternalLink, RefreshCw, Layers, CheckCircle2,
  X, Save, FileText, Send, Info, Eye, ArrowLeft,
  Smartphone, Bell, LayoutGrid
} from 'lucide-react';
import { 
  MOCK_MINISTRY_STATS, 
  MOCK_MINISTRY_FEEDBACK, 
  MOCK_PERFORMANCE_DATA,
  MOCK_SUBSIDY_DETAILS 
} from '../constants';
import { MinistrySubRole } from '../types';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];
const CROPS = ['All Crops', 'Maize', 'Rice', 'Cassava'];

const MinistryDashboard: React.FC = () => {
  const [subRole, setSubRole] = useState<MinistrySubRole>('POLICY_MAKER');
  const [filterCrop, setFilterCrop] = useState<string>('All Crops');
  const [isExporting, setIsExporting] = useState(false);
  const [showTargets, setShowTargets] = useState(true);
  
  // Modal States
  const [activeModal, setActiveModal] = useState<'GOVERNANCE' | 'DIRECTIVE' | null>(null);
  const [directiveStep, setDirectiveStep] = useState<'DRAFT' | 'REVIEW'>('DRAFT');
  const [directiveForm, setDirectiveForm] = useState({
    message: '',
    audience: 'All Stakeholders',
    priority: 'Normal'
  });
  const [isPublishing, setIsPublishing] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Strategic Report Exported successfully to PDF/Excel.');
    }, 1500);
  };

  const handlePublishDirective = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      alert('Policy Directive published successfully to ' + directiveForm.audience + '.');
      setDirectiveForm({ message: '', audience: 'All Stakeholders', priority: 'Normal' });
      setDirectiveStep('DRAFT');
      setActiveModal(null);
    }, 2000);
  };

  const activeAlerts = MOCK_MINISTRY_FEEDBACK.filter(f => f.priority === 'high').length;
  const currentChartData = MOCK_PERFORMANCE_DATA[filterCrop as keyof typeof MOCK_PERFORMANCE_DATA] || MOCK_PERFORMANCE_DATA['All Crops'];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500 relative">
      
      {/* Real-Time National Alert Banner */}
      {activeAlerts > 0 && (
        <div className="bg-red-600 text-white px-6 py-3 rounded-2xl flex items-center justify-between shadow-lg shadow-red-600/20 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertCircle className="shrink-0" size={20} />
            <div className="text-xs md:text-sm font-bold">
              CRITICAL: {activeAlerts} High-Priority Field Intelligence Alerts require immediate intervention.
            </div>
          </div>
          <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors">
            Review Alerts
          </button>
        </div>
      )}

      {/* Strategic Header */}
      <div className="bg-slate-900 text-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden border-b-8 border-emerald-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Globe size={20} />
                <span className="text-xs font-black uppercase tracking-[0.3em]">National Command Center</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black">Food Security Operations</h1>
              <p className="text-slate-400 mt-2 max-w-lg">Monitoring 1.2M verified farmers and ₦24B in annual input subsidies with real-time digital oversight.</p>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <div className="bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex gap-1 overflow-x-auto no-scrollbar">
                <RoleButton active={subRole === 'POLICY_MAKER'} onClick={() => setSubRole('POLICY_MAKER')} label="Strategy" icon={<TrendingUp size={14}/>} />
                <RoleButton active={subRole === 'AUDIT_LEAD'} onClick={() => setSubRole('AUDIT_LEAD')} label="Audit" icon={<ShieldCheck size={14}/>} />
                <RoleButton active={subRole === 'EXTENSION_COORD'} onClick={() => setSubRole('EXTENSION_COORD')} label="Field" icon={<Zap size={14}/>} />
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex-1 bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                >
                  <Download size={14} /> {isExporting ? 'Generating...' : 'Export Report'}
                </button>
                <button className="bg-emerald-500 text-slate-900 p-2 rounded-xl hover:bg-emerald-400 transition-colors">
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-500">
          <Filter size={14} /> Global View:
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {CROPS.map(crop => (
            <button 
              key={crop}
              onClick={() => setFilterCrop(crop)}
              className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                filterCrop === crop ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={showTargets} 
              onChange={() => setShowTargets(!showTargets)}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-[10px] font-black text-slate-400 uppercase group-hover:text-slate-600 transition-colors tracking-widest">Show Targets</span>
          </label>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MinistryStatCard icon={<Users className="text-blue-500" />} label="Digital ID Registry" value="1.24M" sub="Verified Biometrics" color="blue" />
        <MinistryStatCard icon={<FileCheck className="text-emerald-500" />} label="Subsidy Pipeline" value="94.2%" sub="Redemption Purity" color="emerald" />
        <MinistryStatCard icon={<Map className="text-amber-500" />} label="Monitored Land" value="4.2M Ha" sub="Satellite Verified" color="amber" />
        <MinistryStatCard icon={<Award className="text-purple-500" />} label="Leakage Saving" value="₦4.2B" sub="FY24 Prevention" color="purple" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Performance Comparison Chart */}
        <section className="xl:col-span-2 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm min-h-[500px] flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-black text-slate-800">Yield Analytics</h3>
                <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg">
                  <LayoutGrid size={14} className="text-slate-400" />
                  <select 
                    value={filterCrop}
                    onChange={(e) => setFilterCrop(e.target.value)}
                    className="bg-transparent text-[11px] font-black uppercase tracking-wider text-emerald-600 outline-none cursor-pointer"
                  >
                    {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <p className="text-xs text-slate-500">National production metrics for {filterCrop}.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Current</span>
              {showTargets && <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400"><div className="w-2 h-2 rounded-full bg-slate-300" /> Target</span>}
              <span className="flex items-center gap-1 text-[10px] font-bold text-blue-500"><div className="w-2 h-2 rounded-full bg-blue-500" /> Prev Year</span>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}}
                />
                <Area name="Yield" type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorYield)" />
                <Line name="Previous" type="monotone" dataKey="prev" stroke="#3b82f6" strokeWidth={2} dot={false} />
                {showTargets && <Line name="Target" type="monotone" dataKey="target" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} />}
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex justify-around p-4 bg-slate-50 rounded-2xl overflow-x-auto no-scrollbar">
            <PerformanceMetric label="Avg Yield Increase" value="+24%" status="above" />
            <PerformanceMetric label="Target Gap" value="-4.2%" status="below" />
            <PerformanceMetric label="YoY Growth" value="+15.8%" status="above" />
          </div>
        </section>

        {/* Real-Time Field Feed */}
        <section className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-xl flex flex-col h-[600px] md:h-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black flex items-center gap-2">
              <MessageSquare className="text-emerald-400" size={18} /> Field Intelligence
            </h3>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live Stream</span>
            </span>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar no-scrollbar">
            {MOCK_MINISTRY_FEEDBACK.map(item => (
              <div key={item.id} className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] ${item.priority === 'high' ? 'bg-white/10 border-red-500/50 shadow-lg shadow-red-500/10' : 'bg-white/5 border-white/10'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${item.priority === 'high' ? 'bg-red-500' : 'bg-slate-600'}`}>
                    {item.category.replace('_', ' ')}
                  </span>
                  <span className="text-[9px] text-slate-500 font-bold">{item.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">{item.message}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                    <Map size={10} /> {item.location}
                  </div>
                  <button className="text-[9px] text-blue-400 font-black uppercase hover:text-blue-300 flex items-center gap-1">
                    Investigate <ExternalLink size={8} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Global Sentiment</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{width: '78%'}}></div>
              </div>
              <span className="text-xs font-black text-emerald-400">78% Positive</span>
            </div>
          </div>
        </section>
      </div>

      {/* Subsidy Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <ClipboardList className="text-blue-600" /> Subsidy Portfolio
            </h3>
            <button className="text-[10px] font-black text-blue-600 uppercase border-b border-blue-600 pb-0.5">Audit All Vouchers</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_SUBSIDY_DETAILS.map((sub, i) => (
              <div key={i} className="p-5 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-all group shadow-sm hover:shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub.type}</span>
                  <div className={`px-2 py-0.5 rounded text-[9px] font-black ${sub.efficiency >= 95 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {sub.efficiency}% Efficiency
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <div className="text-2xl font-black text-slate-800">{sub.redeemed}</div>
                  <div className="text-[10px] text-slate-400 font-bold">of {sub.total}</div>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full relative overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${sub.efficiency}%`, backgroundColor: sub.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Crop Strategy Mix */}
        <section className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Briefcase className="text-emerald-600" /> Strategic Supply Forecast
            </h3>
          </div>
          <div className="flex-1 flex flex-col md:flex-row items-center gap-8 justify-center">
            <div className="h-48 w-48 shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%" minHeight={192}>
                <PieChart>
                  <Pie
                    data={MOCK_MINISTRY_STATS.topCrops}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {MOCK_MINISTRY_STATS.topCrops.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <div className="text-lg font-black text-slate-800">100%</div>
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-wider">National</div>
              </div>
            </div>
            <div className="flex-1 w-full space-y-4">
              {MOCK_MINISTRY_STATS.topCrops.map((crop, i) => (
                <div key={i} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                      <span className="text-xs font-black text-slate-700 uppercase tracking-wider">{crop.name}</span>
                    </div>
                    <span className="text-xs font-black text-slate-800">{crop.value}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all group-hover:scale-x-105 origin-left" style={{ width: `${crop.value}%`, backgroundColor: COLORS[i % COLORS.length] }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Strategic Audit Footer */}
      <div className="bg-slate-100 border border-slate-200 p-6 md:p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-500">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Compliance Status</div>
            <div className="text-lg font-black text-slate-800">Verified & Audit Ready</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button 
            onClick={() => setActiveModal('GOVERNANCE')}
            className="bg-white border border-slate-200 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            Review Governance Rules
          </button>
          <button 
            onClick={() => {
              setActiveModal('DIRECTIVE');
              setDirectiveStep('DRAFT');
            }}
            className="bg-slate-900 text-white px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            Update Policy Directives
          </button>
        </div>
      </div>

      {/* MODAL: Governance Rules */}
      {activeModal === 'GOVERNANCE' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-900">National Governance Framework</h2>
                <p className="text-sm text-slate-500">Current active rules and oversight parameters.</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <GovernanceRule 
                icon={<ShieldCheck className="text-emerald-500" />} 
                title="Input Trust Threshold" 
                value="650 Points" 
                description="Minimum trust score required for automatic voucher redemption at Tier-1 dealers."
              />
              <GovernanceRule 
                icon={<AlertCircle className="text-amber-500" />} 
                title="Pest Alert Escalation" 
                value=">15% Area Density" 
                description="Critical threshold for deploying national drone and extension intervention teams."
              />
              <GovernanceRule 
                icon={<Briefcase className="text-blue-500" />} 
                title="Market Pricing Variance" 
                value="+/- 8% National Mean" 
                description="Trigger for price-intervention subsidy adjustments to protect smallholder margins."
              />
              <GovernanceRule 
                icon={<Users className="text-purple-500" />} 
                title="Cooperative Audit Frequency" 
                value="Quarterly" 
                description="Mandatory digital audit of ledger transparency and input distribution purity."
              />
            </div>
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setActiveModal(null)} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-500">Close</button>
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-600/20">Edit Framework</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Policy Directives (Multi-Step) */}
      {activeModal === 'DIRECTIVE' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${directiveStep === 'DRAFT' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-600'}`}>1</div>
                  <div className="w-8 h-[2px] bg-slate-100"></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${directiveStep === 'REVIEW' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  {directiveStep === 'DRAFT' ? 'Draft Policy Directive' : 'Review & Confirm'}
                </h2>
                <p className="text-sm text-slate-500">
                  {directiveStep === 'DRAFT' ? 'Enter details for the new national broadcast.' : 'Final check before sending to the network.'}
                </p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              {directiveStep === 'DRAFT' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Directive Message</label>
                    <textarea 
                      value={directiveForm.message}
                      onChange={(e) => setDirectiveForm({ ...directiveForm, message: e.target.value })}
                      placeholder="e.g. Due to climate alerts in Sector C, all maize subsidies are temporarily increased by 5%..."
                      className="w-full min-h-[150px] p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Audience</label>
                      <select 
                        value={directiveForm.audience}
                        onChange={(e) => setDirectiveForm({ ...directiveForm, audience: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
                      >
                        <option>All Stakeholders</option>
                        <option>Cooperatives Only</option>
                        <option>Extension Agents</option>
                        <option>Loan Providers</option>
                        <option>Verified Smallholders</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority Level</label>
                      <select 
                        value={directiveForm.priority}
                        onChange={(e) => setDirectiveForm({ ...directiveForm, priority: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
                      >
                        <option>Normal</option>
                        <option>Strategic</option>
                        <option>Emergency</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Message Summary</div>
                    <p className="text-sm text-slate-700 leading-relaxed italic">"{directiveForm.message}"</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <Users className="text-blue-500" size={18} />
                      <div>
                        <div className="text-[9px] font-black text-blue-400 uppercase">Target</div>
                        <div className="text-xs font-black text-blue-900">{directiveForm.audience}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                      <Bell className={`text-amber-500 ${directiveForm.priority === 'Emergency' ? 'animate-bounce' : ''}`} size={18} />
                      <div>
                        <div className="text-[9px] font-black text-amber-400 uppercase">Priority</div>
                        <div className="text-xs font-black text-amber-900">{directiveForm.priority}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3">
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                    <div className="text-[10px] text-emerald-800 leading-tight">
                      <strong>Impact Analysis:</strong> This directive will trigger ~1.2M push notifications and SMS updates. Estimated network response time: 4 minutes.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => {
                  if (directiveStep === 'REVIEW') setDirectiveStep('DRAFT');
                  else setActiveModal(null);
                }} 
                className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2"
              >
                {directiveStep === 'REVIEW' ? <ArrowLeft size={14}/> : null}
                {directiveStep === 'REVIEW' ? 'Back to Edit' : 'Discard'}
              </button>
              
              {directiveStep === 'DRAFT' ? (
                <button 
                  disabled={!directiveForm.message.trim()}
                  onClick={() => setDirectiveStep('REVIEW')}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  Review Directive <Eye size={14} />
                </button>
              ) : (
                <button 
                  onClick={handlePublishDirective}
                  disabled={isPublishing}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg hover:bg-emerald-700 transition-all active:scale-95"
                >
                  {isPublishing ? <RefreshCw className="animate-spin" size={14} /> : <Send size={14} />}
                  {isPublishing ? 'Broadcasting...' : 'Confirm & Publish'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GovernanceRule = ({ icon, title, value, description }: { icon: React.ReactNode, title: string, value: string, description: string }) => (
  <div className="flex items-start gap-4 p-5 rounded-3xl border border-slate-100 hover:bg-slate-50 transition-colors group">
    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{title}</h4>
        <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{value}</span>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  </div>
);

const PerformanceMetric = ({ label, value, status }: { label: string, value: string, status: 'above' | 'below' }) => (
  <div className="text-center min-w-[120px]">
    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
    <div className={`text-lg font-black ${status === 'above' ? 'text-emerald-600' : 'text-red-500'}`}>
      {value}
    </div>
  </div>
);

const RoleButton = ({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
      active ? 'bg-emerald-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon} {label}
  </button>
);

const MinistryStatCard = ({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string; sub: string; color: string }) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-100 text-blue-800',
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-800',
    amber: 'bg-amber-50 border-amber-100 text-amber-800',
    purple: 'bg-purple-50 border-purple-100 text-purple-800',
  };
  
  return (
    <div className={`p-5 rounded-[2rem] border transition-all hover:shadow-xl hover:-translate-y-1 ${colorMap[color] || 'bg-white'}`}>
      <div className="bg-white w-10 h-10 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
        {icon}
      </div>
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-2xl font-black text-slate-800 mb-1">{value}</div>
      <div className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-1">
        {sub} <ChevronRight size={10} className="text-slate-300" />
      </div>
    </div>
  );
};

export default MinistryDashboard;
