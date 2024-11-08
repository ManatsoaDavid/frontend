import React from 'react';
import DashboardCard from './DashboardCard';
import { FaClipboardList } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const CurrentRequestsCard: React.FC = () => {
  const { users } = useSelector((state: RootState) => state.praticiens);

  // Filter practitioners with 'nouveau' or 'attente' status
  const currentRequests = users?.filter(
    practitioner => practitioner.status === 'nouveau' || practitioner.status === 'attente'
  ).length || 0;

  return (
    <DashboardCard
      title="Demandes en cours"
      icon={FaClipboardList}
      value={currentRequests.toString()}
    />
  );
};

export default CurrentRequestsCard;
