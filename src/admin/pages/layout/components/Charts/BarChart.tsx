import { motion } from 'framer-motion';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

interface BarChartProps {
  data: DataItem[];
  dataKey: string;
  title: string;
}

const DashboardBarChart: React.FC<BarChartProps> = ({ data, dataKey, title }) => {
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-lg font-bold text-primary-600">
            {payload[0].value}
          </p>
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
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar
            dataKey={dataKey}
            fill="url(#colorGradient)"
            radius={[8, 8, 0, 0]}
            animationDuration={2000}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
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
