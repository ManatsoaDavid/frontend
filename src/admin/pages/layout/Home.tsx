import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { FaChartLine, FaChartPie } from 'react-icons/fa';
import { RootState } from 'store/store';
import { ESubscriptionType } from 'shared/models/enums';
import { fetchPractitionerSubscriptions, fetchSubscriptions } from 'practitioner/redux.toolkit/subscription/reducer';

import CurrentRequestsCard from './components/Cards/CurrentRequestsCard';
import SubscriptionRevenueCard from './components/Cards/SubscriptionRevenueCard';
import TotalPractitionersCard from './components/Cards/TotalPractitionersCard';
import TotalVisitorsCard from './components/Cards/TotalVisitorsCard';
import DashboardBarChart from './components/Charts/BarChart';
import SubscriptionDistribution from './components/Charts/PieChart';
import QuickActions from './components/Charts/QuickActions';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { subscriptions } = useSelector((state: RootState) => state.subscription);
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    dispatch(fetchPractitionerSubscriptions() as any);
    dispatch(fetchSubscriptions() as any);
  }, [dispatch]);

  const prepareSubscriptionData = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      name: new Date(0, i).toLocaleString('fr-FR', { month: 'short' }),
      LITE: subscriptions.filter(sub => new Date(sub.endDate).getMonth() === i && sub.type?.type === ESubscriptionType.LITE).length,
      PREMIUM: subscriptions.filter(sub => new Date(sub.endDate).getMonth() === i && sub.type?.type === ESubscriptionType.PREMIUM).length,
      GOLD: subscriptions.filter(sub => new Date(sub.endDate).getMonth() === i && sub.type?.type === ESubscriptionType.GOLD).length,
      total: subscriptions.filter(sub => new Date(sub.endDate).getMonth() === i).length
    }));
  };

  const prepareSubscriptionDistributionData = () => [
    { name: 'Abonnement LITE', value: subscriptions.filter(sub => sub.type?.type === ESubscriptionType.LITE).length, color: '#10B981' },
    { name: 'Abonnement PREMIUM', value: subscriptions.filter(sub => sub.type?.type === ESubscriptionType.PREMIUM).length, color: '#3B82F6' },
    { name: 'Abonnement GOLD', value: subscriptions.filter(sub => sub.type?.type === ESubscriptionType.GOLD).length, color: '#F59E0B' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 font-poppins">
          <span className="text-prim">Tableau</span> de bord
        </h1>
        <select
          className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="day">Aujourd'hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
          <option value="year">Cette année</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[TotalPractitionersCard, TotalVisitorsCard, CurrentRequestsCard].map((CardComponent, idx) => (
          <motion.div key={idx} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <CardComponent />
          </motion.div>
        ))}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <SubscriptionRevenueCard revenue={100000} />
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            <FaChartLine className="mr-2 text-prim" />
            Statistiques des abonnements
          </h2>
          <DashboardBarChart data={prepareSubscriptionData()} title="Répartition mensuelle des abonnements" />
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
            <FaChartPie className="mr-2 text-prim" />
            Distribution des Abonnements
          </h2>
          <SubscriptionDistribution data={prepareSubscriptionDistributionData()} />
        </motion.div>
      </div>

      {/* Quick Actions Section */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <QuickActions />
      </motion.div>
    </motion.div>
  );
};

export default Home;
