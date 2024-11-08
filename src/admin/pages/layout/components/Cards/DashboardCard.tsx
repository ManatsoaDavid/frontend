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
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full md:w-auto bg-white rounded-2xl p-6 overflow-hidden
        shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff]
        transition-all duration-300 hover:shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff]"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${getGradient()} opacity-10`}></div>
      </div>

      <div className="relative flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className={`bg-gradient-to-br ${getGradient()} p-4 rounded-2xl
            shadow-[inset_2px_2px_4px_rgba(255,255,255,0.2),2px_2px_4px_rgba(0,0,0,0.1)]
            transform transition-transform duration-300 hover:rotate-12`}
          >
            <Icon className="text-2xl sm:text-3xl text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-700 font-poppins">{title}</h2>
        </div>

        {/* Value */}
        <div className="flex items-end justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600"
          >
            {value}
          </motion.p>

          {trend && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center space-x-2 ${trend.isPositive ? 'text-green-500' : 'text-red-500'
                }`}
            >
              <span className="text-sm font-semibold">
                {trend.isPositive ? '+' : '-'}{trend.value}%
              </span>
              <motion.div
                animate={{ y: trend.isPositive ? -3 : 3 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
              >
                {trend.isPositive ? '↑' : '↓'}
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '70%' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${getGradient()}`}
          />
        </div>

        {/* Bottom Stats */}
        <div className="flex justify-between text-sm text-gray-500 pt-2">
          <span>Cette semaine</span>
          <span className="font-medium text-primary-600">+12.5%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
