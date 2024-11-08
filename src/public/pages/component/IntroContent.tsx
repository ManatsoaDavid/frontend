import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaQuestionCircle, FaSearch, FaSignInAlt, FaUserMd, FaUserPlus } from 'react-icons/fa';

const SearchAndIntroContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full md:w-1/2 mb-6 md:mb-0">
      <h1 className="text-4xl font-bold text-dark mb-4 font-mono">Bienvenue sur <br></br><span className='text-prim'>R. Docteur</span></h1>
      <p className="text-side text-lg mb-4 font-sans">Trouvez des docteurs, dentistes, ou praticiens les plus proches de chez vous.</p>
      <ul className="mb-6 space-y-2">
        <li className="flex items-center">
          <FaUserMd className="text-prim mr-2 " />
          <span className='font-sans'>Accédez à un large réseau de professionnels de santé</span>
        </li>
        <li className="flex items-center">
          <FaMapMarkerAlt className="text-prim mr-2" />
          <span className='font-sans'>Localisez facilement les praticiens dans votre région</span>
        </li>
        <li className="flex items-center">
          <FaCalendarAlt className="text-prim mr-2" />
          <span className='font-sans'>Prenez rendez-vous en ligne rapidement et simplement</span>
        </li>
      </ul>
      <form onSubmit={handleSearch} className="relative flex items-center">
        <input
          type="text"
          placeholder="Rechercher un professionnel de santé..."
          className="w-full py-3 pl-12 pr-4 text-gray-700 bg-transparent border-2 border-prim rounded-full focus:outline-none focus:ring-2 focus:ring-prim focus:border-transparent transition duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="absolute inset-y-0 left-0 flex items-center pl-4">
          <FaSearch className="text-prim text-xl" />
        </button>
        <div className="flex ml-4 space-x-2">
          <div className="p-2 border-2 border-prim rounded-full hover:bg-prim hover:text-white transition duration-300">
            <FaQuestionCircle className="text-xl" title="Aide" />
          </div>
          <div className="p-2 border-2 border-prim rounded-full hover:bg-prim hover:text-white transition duration-300">
            <FaUserPlus className="text-xl" title="S'inscrire" />
          </div>
          <div className="p-2 border-2 border-prim rounded-full hover:bg-prim hover:text-white transition duration-300">
            <FaSignInAlt className="text-xl" title="Se connecter" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchAndIntroContent;
