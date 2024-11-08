import React, { useState } from 'react';
import { FaCog, FaFacebookMessenger, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfileNavbar: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="relative">
      <button
        className="text-gray-600 hover:text-gray-800 focus:outline-none"
        onClick={toggleProfile}
      >
        <FaUserCircle className="w-6 h-6" />
      </button>
      {isProfileOpen && (
        <div className="absolute top-10 right-0 bg-white dark:bg-gray-800 rounded-md shadow-lg w-48 z-10 p-2">
          <ul className="space-y-2">
            <li>
              <Link
                to="/practitioner/profile"
                className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <FaUserCircle className="w-5 h-5 mr-2" />
                Mon profil
              </Link>
            </li>
            <li>
              <Link
                to="/practitioner/message"
                className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <FaFacebookMessenger className="w-5 h-5 mr-2" />
                Message
              </Link>
            </li>
            <li>
              <Link
                to="/practitioner/settings"
                className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <FaCog className="w-5 h-5 mr-2" />
                Paramètres
              </Link>
            </li>
            <li>
              <button
                className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 w-full text-left"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="w-5 h-5 mr-2" />
                Se déconnecter
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileNavbar;
