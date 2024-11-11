import { fetchPraticient } from 'public/redux.toolkit/praticient/reducer';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface SearchCriteria {
  specialty: string;
  officeAddress: string;
  name: string;
}

const PractitionerSearch: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    specialty: '',
    officeAddress: '',
    name: ''
  });

  useEffect(() => {
    dispatch(fetchPraticient() as any);
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/practitioners-results', { state: searchCriteria });
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
        <div className="flex items-center bg-white rounded-lg shadow-lg border border-gray-200 p-1">
          <div className="flex-1 relative border-r border-gray-300">
            <div className="flex">
              <input
                type="text"
                placeholder="Spécialité"
                className="w-1/2 px-4 py-3 pl-10 text-gray-800 bg-transparent focus:outline-none border-r"
                value={searchCriteria.specialty}
                onChange={(e) => setSearchCriteria({
                  ...searchCriteria,
                  specialty: e.target.value
                })}
              />
              <input
                type="text"
                placeholder="Nom du praticien"
                className="w-1/2 px-4 py-3 pl-10 text-gray-800 bg-transparent focus:outline-none"
                value={searchCriteria.name}
                onChange={(e) => setSearchCriteria({
                  ...searchCriteria,
                  name: e.target.value
                })}
              />
            </div>
            <FaSearch className="absolute  top-1/2 transform -translate-y-1/2 text-prim text-lg" />
          </div>


          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Où ? (adresse, ville...)"
              className="w-full px-4 py-3 pl-10 text-gray-800 bg-transparent focus:outline-none"
              value={searchCriteria.officeAddress}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, officeAddress: e.target.value })}
            />
            <FaMapMarkerAlt className="absolute  top-1/2 transform -translate-y-1/2 text-prim text-lg" />
          </div>

          <button
            className="bg-prim hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition duration-150 ml-2"
            type="submit"
          >
            Rechercher
          </button>
        </div>

      </form>




    </div>

  );
};

export default PractitionerSearch;
