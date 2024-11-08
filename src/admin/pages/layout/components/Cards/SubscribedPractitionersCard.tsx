import React from 'react';
import DashboardCard from './DashboardCard';
import { FaUserCheck } from 'react-icons/fa';

interface SubscribedPractitionersCardProps {
  subscribedPractitioners: number;
}

const SubscribedPractitionersCard: React.FC<SubscribedPractitionersCardProps> = ({ subscribedPractitioners }) => {
  return (
    <DashboardCard
      title="Subscribed Practitioners"
      icon={FaUserCheck}
      value={subscribedPractitioners.toString()}
    />
  );
};

export default SubscribedPractitionersCard;
