import { motion } from 'framer-motion';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface SubscriptionData {
  name: string;
  LITE: number;
  PREMIUM: number;
  GOLD: number;
  total: number;
}

interface BarChartProps {
  data: SubscriptionData[];
  title: string;
}

const DashboardBarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-600">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} abonnements
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff]
        transition-all duration-300 h-[400px] w-full"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip content={customTooltip} />
          <Legend />
          <Bar
            dataKey="LITE"
            stackId="a"
            fill="#60A5FA"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          <Bar
            dataKey="PREMIUM"
            stackId="a"
            fill="#34D399"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          <Bar
            dataKey="GOLD"
            stackId="a"
            fill="#FBBF24"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          <Bar
            dataKey="total"
            fill="url(#totalGradient)"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          <defs>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ab0c3" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0ab0c3" stopOpacity={0.2} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default DashboardBarChart;
