import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { localStorageService } from 'utils/localStorageService';

const DarkMode: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedDarkMode = localStorageService.getItem('darkMode');
    if (storedDarkMode === 'true') {
      document.documentElement.classList.add('dark');
    }
    return storedDarkMode === 'true';
  });

  useEffect(() => {
    console.log('Dark mode changed:', isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorageService.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <button
      className="relative p-2 text-gray-600 dark:text-gray-300 transition-all duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:text-prim"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <FaMoon className="w-5 h-5 text-blue-600 transform transition-transform hover:-rotate-12" />
      ) : (
        <FaSun className="w-5 h-5 text-amber-400 transform transition-transform hover:rotate-12" />

      )}
    </button>
  );
};

export default DarkMode;
