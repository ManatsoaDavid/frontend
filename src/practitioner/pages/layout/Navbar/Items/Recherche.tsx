import React from 'react';
import { FiSearch } from 'react-icons/fi';

const Recherche: React.FC = () => {
  return (
    <div className="relative flex-grow">
      <input
        type="text"
        placeholder="    Rechercher..."
        className="bg-gray-100 blue:bg-gray-700 rounded-md px-4 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default Recherche;
