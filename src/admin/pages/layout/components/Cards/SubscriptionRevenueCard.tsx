import React from 'react';
import DashboardCard from './DashboardCard';
import { FaMoneyBillWave } from 'react-icons/fa';

interface SubscriptionRevenueCardProps {
  revenue: number;
}

const SubscriptionRevenueCard: React.FC<SubscriptionRevenueCardProps> = ({ revenue }) => {
  return (
    <DashboardCard
      title="Subscription Revenue"
      icon={FaMoneyBillWave}
      value={`$${revenue.toLocaleString()}`}
    />
  );
};

export default SubscriptionRevenueCard;
