import { fetchPraticiens } from 'admin/redux.toolkit/praticient/reducer';
import React, { useEffect } from 'react';
import { FaUserMd } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import DashboardCard from './DashboardCard';

const TotalPractitionersCard: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.praticiens);

  useEffect(() => {
    dispatch(fetchPraticiens() as any);
  }, [dispatch]);

  const totalPractitioners = users?.length || 0;

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
