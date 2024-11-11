import React from 'react';
import { FaCity, FaGlobeAfrica, FaMapMarkerAlt } from 'react-icons/fa';

const provinces = [
  "Antananarivo",
  "Antsiranana",
  "Fianarantsoa",
  "Mahajanga",
  "Toamasina",
  "Toliara"
];

interface OfficeAddressInputProps {
  value: string;
  onChange: (value: string) => void;
}

const OfficeAddressInput: React.FC<OfficeAddressInputProps> = ({ value, onChange }) => {
  const [addressParts, setAddressParts] = React.useState({
    lot: '',
    city: '',
    province: ''
  });

  React.useEffect(() => {
    const fullAddress = `${addressParts.lot}, ${addressParts.city}, ${addressParts.province}`.trim();
    onChange(fullAddress);
  }, [addressParts]);

  return (
    <div className="flex items-start space-x-6 bg-white rounded-xl p-2 shadow-sm border border-gray-100">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Adresse du cabinet</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label htmlFor="lot" className="block text-sm font-medium text-gray-700 mb-2">
              <FaMapMarkerAlt className="inline mr-2 text-prim" />
              Lot
            </label>
            <input
              type="text"
              id="lot"
              value={addressParts.lot}
              onChange={(e) => setAddressParts({ ...addressParts, lot: e.target.value })}
              className="w-full p-2 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-prim focus:border-transparent transition duration-200 ease-in-out"
              placeholder="Ex: Lot 123 Ambalapaiso"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              <FaCity className="inline mr-2 text-prim" />
              Ville
            </label>
            <input
              type="text"
              id="city"
              value={addressParts.city}
              onChange={(e) => setAddressParts({ ...addressParts, city: e.target.value })}
              className="w-full p-2 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-prim focus:border-transparent transition duration-200 ease-in-out"
              placeholder="Ex: Haute-Matsiatra"
            />
          </div>

          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
              <FaGlobeAfrica className="inline mr-2 text-prim" />
              Province
            </label>
            <select
              id="province"
              value={addressParts.province}
              onChange={(e) => setAddressParts({ ...addressParts, province: e.target.value })}
              className="w-full p-2 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-prim focus:border-transparent bg-white transition duration-200 ease-in-out cursor-pointer"
            >
              <option value="" disabled>Province</option>
              {provinces.map((province) => (
                <option key={province} value={province} className="py-2">
                  {province}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};


export default OfficeAddressInput;
