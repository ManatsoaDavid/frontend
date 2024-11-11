import React from 'react';
import { FaCertificate, FaUserMd } from 'react-icons/fa';

interface PractitionerDropdownsProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const specialties = [
  "Médecin généraliste",
  "Cardiologue",
  "Dermatologue",
  "Pédiatre",
  "Psychiatre",
  "Chirurgien",
  "Gynécologue",
  "Ophtalmologue",
  "Dentiste",
  "Orthopédiste"
];

const categories = [
  "Conventionné secteur 1",
  "Conventionné secteur 2",
  "Non conventionné",
  "Honoraires libres"
];

const PractitionerDropdowns: React.FC<PractitionerDropdownsProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-blue-50 p-2 rounded-lg">
            <FaUserMd className="text-2xl text-prim" />
          </div>
          <div className="flex-grow">
            <label htmlFor="specialty" className="block text-sm font-semibold text-gray-700 mb-2">
              Spécialité médicale
            </label>
            <select
              id="specialty"
              value={formData.specialty}
              onChange={(e) => updateFormData({ specialty: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-prim focus:border-transparent transition-all duration-200 ease-in-out text-gray-600"
            >
              <option value="">Sélectionnez votre spécialité</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-blue-50 p-2 rounded-lg">
            <FaCertificate className="text-2xl text-prim" />
          </div>
          <div className="flex-grow">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
              Convention & Honoraires
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => updateFormData({ category: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-prim focus:border-transparent transition-all duration-200 ease-in-out text-gray-600"
            >
              <option value="">Sélectionnez votre convention</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PractitionerDropdowns;
