import React from 'react';
import { FaCalendarAlt, FaChartBar, FaFileInvoice, FaHome, FaSignOutAlt, FaTimes, FaUser, FaUsers } from 'react-icons/fa';
import { useUserData } from 'shared/hooks/fetchUser';
import { localStorageService } from 'utils/localStorageService';
import SidebarLink from './SidebarLink';

interface SidebarProps {
  closeSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const userId = localStorageService.getItem('userData')?.userId;
  const { userData } = useUserData(userId);

  const IMAGE_API = `${process.env.REACT_APP_API_URL?.replace('/api', '') || ''}/uploads`;

  return (
    <div className="bg-white dark:bg-side p-4 rounded-md shadow-md h-full flex flex-col">
      {closeSidebar && (
        <button
          className="self-end text-gray-600 hover:text-gray-800 focus:outline-none mb-4"
          onClick={closeSidebar}
        >
          <FaTimes size={24} />
        </button>
      )}

      <div className="flex items-center mb-4">
        {userData && userData.avatar ? (
          <img src={`${IMAGE_API}/${userData.avatar}`} alt={userData.name} className="w-16 h-16 rounded-full mr-4" />
        ) : (
          <FaUser className="mr-2" />
        )}
        <span className="ml-2 text-sans text-sm">{userData ? userData.name : 'Utilisateur'}</span>
      </div>

      <div className="flex-1 mt-6 space-y-4">
        <SidebarLink to="/practitioner/dashboard" icon={<FaHome size={24} />} label="Accueil" />
        <SidebarLink to="/practitioner/agenda" icon={<FaCalendarAlt size={24} />} label="Agenda" />
        <SidebarLink to="/practitioner/patients" icon={<FaUsers size={24} />} label="Patients" />
        <SidebarLink to="/practitioner/list-rendez-vous" icon={<FaCalendarAlt size={24} />} label="Rendez-vous" />
        <SidebarLink to="/practitioner/abonnement" icon={<FaFileInvoice size={24} />} label="Abonnement" />
        <SidebarLink to="/practitioner/statistics" icon={<FaChartBar size={24} />} label="Statistiques" />
      </div>
      <SidebarLink to="/login" icon={<FaSignOutAlt />} label="Déconnexion" />
    </div>
  );
};

export default Sidebar;
