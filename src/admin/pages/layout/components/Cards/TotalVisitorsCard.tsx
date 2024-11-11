
import React, { useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import DashboardCard from './DashboardCard';
import { fetchVisitors } from 'visiteur/redux-toolkit/reducer';

const TotalVisitorsCard: React.FC = () => {
  const dispatch = useDispatch();
  const { visitors, loading, error } = useSelector((state: RootState) => state.visitor);

  useEffect(() => {
    dispatch(fetchVisitors() as any);
  }, [dispatch]);

  const totalVisitors = visitors?.length || 0;

  if (loading) {
    return <DashboardCard
      title="Total Visiteurs"
      icon={FaUsers}
      value="..."
    />;
  }

  if (error) {
    return <DashboardCard
      title="Total Visiteurs"
      icon={FaUsers}
      value="Error"
    />;
  }

  return (
    <DashboardCard
      title="Total Visiteurs"
      icon={FaUsers}
      value={totalVisitors.toString()}
    />
  );
};

export default TotalVisitorsCard;
