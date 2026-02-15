
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CreditGaugeProps {
  score: number;
  label: string;
  max?: number;
}

const CreditGauge: React.FC<CreditGaugeProps> = ({ score, label, max = 900 }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: max - score },
  ];

  const getColor = (s: number) => {
    if (s > 750) return '#10b981'; // emerald-500
    if (s > 600) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  return (
    <div className="flex flex-col items-center justify-center h-48 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={getColor(score)} />
            <Cell fill="#e2e8f0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 text-center">
        <div className="text-3xl font-bold text-slate-800">{score}</div>
        <div className="text-xs text-slate-500 uppercase tracking-widest">{label}</div>
      </div>
    </div>
  );
};

export default CreditGauge;
