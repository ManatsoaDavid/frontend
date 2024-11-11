import React from 'react';
import { FaUserPlus, FaCalendarPlus, FaBell, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Actions rapides</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/homeAdmin/listePraticiens')}
          className="flex items-center p-4 bg-prim/10 rounded-lg hover:bg-prim/20 transition-colors"
        >
          <FaUserPlus className="text-prim mr-2" />
          <span>Nouveau praticien</span>
        </button>
        <button
          onClick={() => navigate('/homeAdmin/demande')}
          className="flex items-center p-4 bg-prim/10 rounded-lg hover:bg-prim/20 transition-colors"
        >
          <FaCalendarPlus className="text-prim mr-2" />
          <span>Demandes</span>
        </button>
        <button
          onClick={() => navigate('/homeAdmin/subscriptions')}
          className="flex items-center p-4 bg-prim/10 rounded-lg hover:bg-prim/20 transition-colors"
        >
          <FaBell className="text-prim mr-2" />
          <span>Liste des abonnés</span>
        </button>
        <button
          onClick={() => navigate('/homeAdmin/statistiques')}
          className="flex items-center p-4 bg-prim/10 rounded-lg hover:bg-prim/20 transition-colors"
        >
          <FaCog className="text-prim mr-2" />
          <span>Statistiques</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
