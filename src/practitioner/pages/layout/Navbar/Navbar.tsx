import { format } from 'date-fns';
import React from 'react';
import { FaBars } from 'react-icons/fa';
import RightSide from './Items/RightSide';
import NavLinks from './Items/navLinks';

interface NavbarProps {
  toggleSidebar: () => void;
  isSmallScreen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSmallScreen }) => {
  const today = format(new Date(), ' dd MMMM yyyy');

  return (
    <nav className="bg-wh dark:bg-side py-2 px-4 rounded-md shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-4">

        {/*************ecran plus petit********* */}
        {isSmallScreen && (
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaBars size={24} />
          </button>
        )}

        {/*************partie gauche******** */}
        <span className="hidden sm:block text-prim font-mono text-sm md:text-base lg:text-lg capitalize dark:text-wh">
          {today}
        </span>
      </div>

      {/*************partie centre******** */}
      <div className="flex-1 flex justify-center">
        <NavLinks />
      </div>

      {/*************partie droite******** */}
      <div className="flex items-center space-x-4">
        <RightSide />
      </div>
    </nav>
  );

};
export default Navbar;
