import { faBell, faClock, faLock, faPenFancy, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-light shadow-md rounded-xl p-4 sm:p-6 lg:p-8 border border-sec w-full md:w-64">
      <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Menu</h2>
      <ul>
        <li className="mb-3 md:mb-4">
          <a href="#" className="flex items-center text-sm md:text-base hover:text-prim transition-colors duration-200 font-sans">
            <FontAwesomeIcon icon={faUser} className="mr-3 md:mr-3" />
            Historique de rendez-vous
          </a>
        </li>
        <li className="mb-3 md:mb-4">
          <a href="#" className="flex items-center text-sm md:text-base hover:text-prim transition-colors duration-200 font-sans">
            <FontAwesomeIcon icon={faClock} className="mr-3 md:mr-3" />
            Rendez-vous en cours
          </a>
        </li>
        <li className="mb-3 md:mb-4">
          <a href="#" className="flex items-center text-sm md:text-base hover:text-prim transition-colors duration-200 font-sans">
            <FontAwesomeIcon icon={faBell} className="mr-3 md:mr-3" />
            Notification
          </a>
        </li>
        <li className="mb-3 md:mb-4">
          <a href="#" className="flex items-center text-sm md:text-base hover:text-prim transition-colors duration-200 font-sans">
            <FontAwesomeIcon icon={faPenFancy} className="mr-3 md:mr-3" />
            Modifier les information
          </a>
        </li>
        <li className="mb-3 md:mb-4">
          <a href="#" className="flex items-center text-sm md:text-base hover:text-prim transition-colors duration-200 font-sans">
            <FontAwesomeIcon icon={faLock} className="mr-3 md:mr-3" />
            Changer de mot de passe
          </a>
        </li>
        <li className="mb-3 md:mb-4">
          <a href="#" className="flex items-center text-sm md:text-base hover:text-prim transition-colors duration-200 font-sans">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 md:mr-3" />
            Se deconnecter
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
