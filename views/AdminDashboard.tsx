
import React from 'react';
import { Users, AlertCircle, TrendingUp, Download, CheckCircle2 } from 'lucide-react';
import { MOCK_COOPERATIVES } from '../constants';

const AdminDashboard: React.FC = () => {
  const coop = MOCK_COOPERATIVES[0];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{coop.name}</h2>
          <p className="text-sm text-slate-500">Administrator Portal</p>
        </div>
        <button className="bg-white p-2 rounded-lg shadow-sm border border-slate-200">
          <Download size={20} className="text-slate-600" />
        </button>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Active Farmers</div>
          <div className="text-2xl font-bold text-slate-800">142</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">+8 this month</div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Avg Trust Score</div>
          <div className="text-2xl font-bold text-slate-800">742</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">Tier 1 Compliance</div>
        </div>
      </div>

      {/* Alerts for Admin */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
        <div className="flex items-center gap-2 mb-3 text-amber-800 font-bold">
          <AlertCircle size={20} />
          <span>Priority Actions</span>
        </div>
        <div className="space-y-3">
          <ActionItem 
            title="Pest Alert Validation" 
            desc="3 farmers reported Armyworms in Block B." 
            time="2h ago"
          />
          <ActionItem 
            title="Loan Repayment Overdue" 
            desc="Batch #104 (12 farmers) repayment pending." 
            time="1d ago"
          />
        </div>
      </section>

      {/* Farmer Performance List */}
      <section>
        <h3 className="font-bold text-slate-800 mb-3">Farmer Performance</h3>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
              <tr>
                <th className="px-4 py-3">Farmer</th>
                <th className="px-4 py-3">Compliance</th>
                <th className="px-4 py-3">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <FarmerRow name="Samuel Okoro" status="Excellent" score={845} />
              <FarmerRow name="Bisi Akande" status="Good" score={720} />
              <FarmerRow name="John Doe" status="Warning" score={580} />
              <FarmerRow name="Mary Salami" status="Excellent" score={890} />
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const ActionItem = ({ title, desc, time }: { title: string; desc: string; time: string }) => (
  <div className="bg-white p-3 rounded-xl shadow-sm flex justify-between items-center">
    <div>
      <h4 className="font-bold text-slate-800 text-xs">{title}</h4>
      <p className="text-[11px] text-slate-500">{desc}</p>
    </div>
    <span className="text-[10px] text-slate-400 italic">{time}</span>
  </div>
);

const FarmerRow = ({ name, status, score }: { name: string; status: string; score: number }) => (
  <tr>
    <td className="px-4 py-4">
      <div className="font-bold text-slate-800">{name}</div>
      <div className="text-[10px] text-slate-400">Maize</div>
    </td>
    <td className="px-4 py-4">
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
        status === 'Excellent' ? 'bg-emerald-100 text-emerald-700' :
        status === 'Good' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-4 py-4 font-bold text-slate-700">{score}</td>
  </tr>
);

export default AdminDashboard;
