import React from 'react';
import { FaBars } from 'react-icons/fa';
import RightSide from './Items/RightSide';

interface NavbarProps {
  toggleSidebar: () => void;
  isSmallScreen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSmallScreen }) => {
  return (
    <nav className="bg-white dark:bg-side p-4 rounded-md shadow-md flex items-center justify-between">
      {/* Button for small screens */}
      {isSmallScreen && (
        <button
          className="mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={toggleSidebar}
        >
          <FaBars size={24} />
        </button>
      )}

      {/* RightSide component (moved to the right on larger screens) */}
      <div className="ml-auto flex items-center space-x-4">
        <RightSide />
      </div>
    </nav>
  );
};

export default Navbar;
