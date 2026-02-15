
import React, { useState } from 'react';
import CreditGauge from '../components/CreditGauge';
import { MOCK_FARMER, MOCK_LOANS, MOCK_VOUCHERS } from '../constants';
import { ShieldCheck, TrendingUp, Info, ArrowRight, Ticket, Check } from 'lucide-react';

const CreditScoreScreen: React.FC = () => {
  const [vouchers, setVouchers] = useState(MOCK_VOUCHERS);
  const [redeemedId, setRedeemedId] = useState<string | null>(null);

  const redeemVoucher = (id: string) => {
    setRedeemedId(id);
    setTimeout(() => {
      setVouchers(prev => prev.map(v => v.id === id ? { ...v, status: 'used' } : v));
      setRedeemedId(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Trust Engine</h2>
        <p className="text-sm text-slate-500">Your agricultural reputation is your credit.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4"><TrendingUp size={20} className="text-blue-600" /><h3 className="font-bold text-slate-800">Financial Credit</h3></div>
          <CreditGauge score={MOCK_FARMER.cashCreditScore} label="Cash Score" />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4"><ShieldCheck size={20} className="text-emerald-600" /><h3 className="font-bold text-slate-800">Agronomic Trust</h3></div>
          <CreditGauge score={MOCK_FARMER.inputTrustScore} label="Input Score" />
        </div>
      </div>

      {/* Input Vouchers Section */}
      <section>
        <h3 className="font-bold text-slate-800 mb-4 px-1 flex items-center gap-2"><Ticket size={20} className="text-emerald-600" /> Active Input Vouchers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vouchers.map(voucher => (
            <div key={voucher.id} className={`p-4 rounded-2xl border transition-all ${voucher.status === 'used' ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-emerald-100 shadow-sm'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className={`font-bold text-sm ${voucher.status === 'used' ? 'text-slate-400' : 'text-slate-800'}`}>{voucher.provider}</h4>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{voucher.type}</p>
                </div>
                <div className="text-lg font-black text-emerald-600">₦{voucher.amount.toLocaleString()}</div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[10px] text-slate-400">Exp: {voucher.expiry}</span>
                {voucher.status === 'used' ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase"><Check size={12} /> Redeemed</span>
                ) : (
                  <button 
                    onClick={() => redeemVoucher(voucher.id)}
                    disabled={redeemedId === voucher.id}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    {redeemedId === voucher.id ? 'Processing...' : 'Redeem Now'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-bold text-slate-800 mb-4 px-1">Recommended Financing</h3>
        <div className="space-y-4">
          {MOCK_LOANS.map(loan => (
            <div key={loan.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div><h4 className="font-bold text-slate-800 text-lg">{loan.lender}</h4><p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Input Financing</p></div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Eligible</div>
              </div>
              <button className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">Apply Now <ArrowRight size={18} /></button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CreditScoreScreen;
