import { selectAllPractitioners } from 'practitioner/redux.toolkit/selector';
import React from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import DashboardCard from './DashboardCard';

const CurrentRequestsCard: React.FC = () => {
  const practitioners = useSelector(selectAllPractitioners);

  const currentRequests = Array.isArray(practitioners)
    ? practitioners.filter(practitioner =>
      practitioner.status === 'nouveau' || practitioner.status === 'attente'
    ).length
    : 0;

  return (
    <DashboardCard
      title="Demandes en cours"
      icon={FaClipboardList}
      value={currentRequests.toString()}
    />
  );
};

export default CurrentRequestsCard;
