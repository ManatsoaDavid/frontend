import React from 'react';
import { FaMapMarkerAlt, FaStethoscope, FaUserMd } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

interface SearchCriteria {
  name?: string;
  specialty?: string;
  officeAddress?: string;
}

const SearchBarInResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchCriteria = location.state as SearchCriteria;

  return (
    <div className="mb-8 mx-auto max-w-7xl px-4">
      <p className='font-sans text-gray-500'>Trouvez à Madagascar des professionnels de santé proposant la prise de rendez-vous en ligne</p>

      <div className="flex flex-col md:flex-row gap-6 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-hover:text-prim transition-colors duration-200">
            <FaUserMd className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Nom du praticien"
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-prim focus:ring-2 focus:ring-prim/20 transition-all duration-200 hover:bg-gray-100"
            onChange={(e) => {
              navigate(location.pathname, {
                state: {
                  ...searchCriteria,
                  name: e.target.value
                }
              });
            }}
            defaultValue={searchCriteria?.name || ''}
          />
        </div>
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-hover:text-prim transition-colors duration-200">
            <FaStethoscope className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Spécialité"
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-prim focus:ring-2 focus:ring-prim/20 transition-all duration-200 hover:bg-gray-100"
            onChange={(e) => {
              navigate(location.pathname, {
                state: {
                  ...searchCriteria,
                  specialty: e.target.value
                }
              });
            }}
            defaultValue={searchCriteria?.specialty || ''}
          />
        </div>
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-hover:text-prim transition-colors duration-200">
            <FaMapMarkerAlt className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Adresse"
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-prim focus:ring-2 focus:ring-prim/20 transition-all duration-200 hover:bg-gray-100"
            onChange={(e) => {
              navigate(location.pathname, {
                state: {
                  ...searchCriteria,
                  officeAddress: e.target.value
                }
              });
            }}
            defaultValue={searchCriteria?.officeAddress || ''}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBarInResult;
