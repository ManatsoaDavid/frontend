import { motion } from 'framer-motion';
import React from 'react';
import { IconType } from 'react-icons';

interface DashboardCardProps {
  title: string;
  icon: IconType;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning';
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon: Icon,
  value,
  trend,
  color = 'primary'
}) => {
  const getGradient = () => {
    switch (color) {
      case 'primary':
        return 'from-primary-500 to-primary-700';
      case 'secondary':
        return 'from-secondary-500 to-secondary-700';
      case 'success':
        return 'from-green-500 to-green-700';
      case 'warning':
        return 'from-yellow-500 to-yellow-700';
      default:
        return 'from-primary-500 to-primary-700';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-64 bg-white rounded-xl p-4
        shadow-[0_4px_12px_rgba(0,0,0,0.1)]
        hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)]
        transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`bg-gradient-to-br ${getGradient()} p-2.5 rounded-lg
          shadow-[0_2px_8px_rgba(0,0,0,0.15)]
          transform transition-transform duration-300 hover:rotate-6`}
        >
          <Icon className="text-xl text-white" />
        </div>
        <h2 className="text-sm font-bold text-gray-700 tracking-wide">{title}</h2>
      </div>

      <div className="flex items-end justify-between mb-3">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
        >
          {value}
        </motion.p>

        {trend && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-1.5 text-sm font-medium
              ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}
          >
            <span>{trend.isPositive ? '+' : '-'}{trend.value}%</span>
            <motion.span
              animate={{ y: trend.isPositive ? -2 : 2 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            >
              {trend.isPositive ? '↑' : '↓'}
            </motion.span>
          </motion.div>
        )}
      </div>

      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '70%' }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${getGradient()}
            shadow-[0_1px_2px_rgba(0,0,0,0.1)]`}
        />
      </div>
    </motion.div>
  );
};




export default DashboardCard;
