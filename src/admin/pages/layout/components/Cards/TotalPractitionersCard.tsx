import { fetchAllPractitioners } from 'practitioner/redux.toolkit/reducer';
import { selectAllPractitioners, selectPractitionerError, selectPractitionerLoading } from 'practitioner/redux.toolkit/selector';
import React, { useEffect } from 'react';
import { FaUserMd } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import DashboardCard from './DashboardCard';

const TotalPractitionersCard: React.FC = () => {
  const dispatch = useDispatch();
  const practitioners = useSelector(selectAllPractitioners);
  const loading = useSelector(selectPractitionerLoading);
  const error = useSelector(selectPractitionerError);

  useEffect(() => {
    dispatch(fetchAllPractitioners() as any);
  }, [dispatch]);

  const totalPractitioners = Array.isArray(practitioners)
    ? practitioners.filter(p => p.status === 'accepter').length
    : 0;

  if (loading) {
    return <DashboardCard
      title="Total Praticiens"
      icon={FaUserMd}
      value="..."
    />;
  }

  if (error) {
    return <DashboardCard
      title="Total Praticiens"
      icon={FaUserMd}
      value="Error"
    />;
  }

  return (
    <DashboardCard
      title="Total Praticiens"
      icon={FaUserMd}
      value={totalPractitioners.toString()}
    />
  );
};

export default TotalPractitionersCard;
