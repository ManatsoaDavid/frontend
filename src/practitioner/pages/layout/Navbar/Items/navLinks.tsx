import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks: React.FC = () => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link
        to="/dashboard"
        className="text-gray-600 hover:text-prim dark:text-gray-200 dark:hover:text-primary-400 transition-colors font-mono"
      >
        Accueil
      </Link>
      <Link
        to="/list-rendez-vous"
        className="text-gray-600 hover:text-prim dark:text-gray-200 dark:hover:text-primary-400 transition-colors font-mono"
      >
        Rendez-vous
      </Link>
      <Link
        to="/patients"
        className="text-gray-600 hover:text-prim dark:text-gray-200 dark:hover:text-primary-400 transition-colors font-mono"
      >
        Agenda
      </Link>
    </div>
  );
};

export default NavLinks;
