import React from 'react';
import { motion } from 'framer-motion';
import TotalPractitionersCard from './components/Cards/TotalPractitionersCard';
import SubscribedPractitionersCard from './components/Cards/SubscribedPractitionersCard';
import CurrentRequestsCard from './components/Cards/CurrentRequestsCard';
import SubscriptionRevenueCard from './components/Cards/SubscriptionRevenueCard';
import DashboardBarChart from './components/Charts/BarChart';

const Home: React.FC = () => {

  const barChartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 278 },
    { name: 'May', value: 189 },
  ];
  const recentActivity = [
    { id: 1, action: 'Nouveau praticien inscrit', user: 'Dr. Smith', time: 'Il y a 5 minutes' },
    { id: 2, action: 'Rendez-vous confirmé', user: 'John Doe', time: 'Il y a 15 minutes' },
    { id: 3, action: 'Mise à jour du profil', user: 'Jane Doe', time: 'Il y a 30 minutes' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen"
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center font-poppins">Tableau de bord</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <TotalPractitionersCard />
        <SubscribedPractitionersCard subscribedPractitioners={750} />
        <CurrentRequestsCard/>
        <SubscriptionRevenueCard revenue={100000} />
      </div>

      <div className="rounded-2xl shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff] p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Diagramme</h2>
        <DashboardBarChart data={barChartData} dataKey="value" title={''} />
      </div>

      <div className="bg-white rounded-2xl shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff] p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Activité récente</h2>
        <ul>
          {recentActivity.map((activity) => (
            <li key={activity.id} className="mb-4 pb-4 border-b last:border-b-0">
              <p className="font-semibold text-gray-700">{activity.action}</p>
              <p className="text-sm text-gray-600">{activity.user} - {activity.time}</p>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Home;
