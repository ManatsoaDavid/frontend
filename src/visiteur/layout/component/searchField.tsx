import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';

interface SearchFieldProps {
  onSearch: (practitioner: IPractitionerWithUser) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ onSearch }) => {
  const [practitionerSearchTerm, setPractitionerSearchTerm] = useState('');
  const [addressSearchTerm, setAddressSearchTerm] = useState(''); const [practitioners, setPractitioners] = useState<IPractitionerWithUser[]>([]);
  const [filteredPractitioners, setFilteredPractitioners] = useState<IPractitionerWithUser[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchPractitioners();
  }, []);


  useEffect(() => {
    if (Array.isArray(practitioners)) {
      const filtered = practitioners.filter((p) => {
        const nameMatch = p.user.name.toLowerCase().includes(practitionerSearchTerm.toLowerCase()) ||
          p.user.firstName.toLowerCase().includes(practitionerSearchTerm.toLowerCase()) ||
          p.specialty.toLowerCase().includes(practitionerSearchTerm.toLowerCase());
        const addressMatch = p.officeAddress.toLowerCase().includes(addressSearchTerm.toLowerCase());
        return nameMatch && addressMatch;
      });
      setFilteredPractitioners(filtered);
    } else {
      setFilteredPractitioners([]);
    }
    setIsDropdownOpen(practitionerSearchTerm.length > 0 || addressSearchTerm.length > 0);
  }, [practitionerSearchTerm, addressSearchTerm, practitioners]);

  const fetchPractitioners = async () => {
    try {
      const response = await fetch(`${API}/practitioners`);
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setPractitioners(result.data);
      } else {
        console.error('Invalid API response structure:', result);
        setPractitioners([]);
      }
    } catch (error) {
      console.error('Error fetching practitioners:', error);
      setPractitioners([]);
    }
  };

  const handleSelectPractitioner = (practitioner: IPractitionerWithUser) => {
    setPractitionerSearchTerm(`${practitioner.user.name} ${practitioner.user.firstName}`);
    setAddressSearchTerm(practitioner.officeAddress);
    setIsDropdownOpen(false);
    onSearch(practitioner);
    navigate(`/visitor/info-pratitient/${practitioner.practitionerId}`);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher un professionnel de santé..."
            className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border-2 border-prim rounded-full focus:outline-none focus:ring-2 focus:ring-prim focus:border-transparent transition duration-300"
            value={practitionerSearchTerm}
            onChange={(e) => setPractitionerSearchTerm(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
          />
          <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-prim text-xl" />
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher par adresse..."
            className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border-2 border-prim rounded-full focus:outline-none focus:ring-2 focus:ring-prim focus:border-transparent transition duration-300"
            value={addressSearchTerm}
            onChange={(e) => setAddressSearchTerm(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
          />
          <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-prim text-xl" />
        </div>
      </div>
      {isDropdownOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredPractitioners.map((practitioner) => (
            <li
              key={practitioner.practitionerId}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-300"
              onClick={() => handleSelectPractitioner(practitioner)}
            >
              <div className="flex items-center">
                <FaUser className="text-prim mr-2" />
                <span className="font-semibold">{`${practitioner.user.name} ${practitioner.user.firstName}`}</span>
                <span className="text-gray-500 ml-2">{practitioner.specialty}</span>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-prim mr-2" />
                <span>{practitioner.officeAddress}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchField;
