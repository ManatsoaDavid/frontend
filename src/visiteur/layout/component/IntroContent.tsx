import React from 'react';
import { FaCalendar, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';
import SearchField from './searchField';

const IntroContent: React.FC = () => {

  const handleSearch = (practitioner: IPractitionerWithUser) => {

  };

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-dark mb-6 font-mono text-center">
        Bienvenue sur <br />
        <span className='text-light'>R. Docteur</span>
      </h1>

      <SearchField onSearch={handleSearch} />

      <div className="flex ml-4 space-x-2 mt-6">
        <div className="p-2 border-2 border-prim rounded-full hover:bg-prim hover:text-white transition duration-300">
          <FaQuestionCircle className="text-xl" title="Aide" />
        </div>
        <div className="p-2 border-2 border-prim rounded-full hover:bg-prim hover:text-white transition duration-300">
          <FaCalendar className="text-xl" title="rendez-vous" />
        </div>
        <div className="p-2 border-2 border-prim rounded-full hover:bg-prim hover:text-white transition duration-300">
          <FaSignOutAlt className="text-xl" title="Se deconnecter" />
        </div>
      </div>
    </div>
  );
};

export default IntroContent;
