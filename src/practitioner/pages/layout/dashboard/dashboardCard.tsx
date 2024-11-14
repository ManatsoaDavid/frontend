import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-wh dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
      <div className="mr-4 text-prim dark:text-primary-400 text-3xl">{icon}</div>
      <div>
        <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-semibold text-gray-700 dark:text-white">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
