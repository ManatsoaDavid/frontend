import React, { useState } from 'react';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
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
        className="relative p-2 text-gray-600 transition-colors duration-200 rounded-full hover:text-prim  focus:text-prim"
        onClick={toggleProfile}
      >
        <FaUserCircle className="w-5 h-5" />
      </button>
      {isProfileOpen && (
        <div className="absolute top-12 right-0 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">

          <ul className="py-2">
            <li>
              <Link
                to="/practitioner/profile"
                className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <FaUserCircle className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                Mon profil
              </Link>
            </li>
            <li className="border-t border-gray-200 dark:border-gray-700">
              <button
                className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="w-4 h-4 mr-3" />
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
