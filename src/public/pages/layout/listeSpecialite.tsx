import React from 'react';
import { FaBone, FaBrain, FaEye, FaHeartbeat, FaTeeth } from 'react-icons/fa';
import image from '../../../image/image2.jpg';

interface Specialty {
  name: string;
  icon: React.ReactElement;
  description: string;
}

const specialties: Specialty[] = [
  { name: 'Cardiologie', icon: <FaHeartbeat />, description: 'Diagnostic et traitement des maladies du cœur et des vaisseaux sanguins.' },
  { name: 'Neurologie', icon: <FaBrain />, description: 'Étude et traitement des troubles du système nerveux.' },
  { name: 'Dentisterie', icon: <FaTeeth />, description: 'Soins dentaires et traitement des problèmes bucco-dentaires.' },
  { name: 'Ophtalmologie', icon: <FaEye />, description: 'Diagnostic et traitement des maladies des yeux.' },
  { name: 'Orthopédie', icon: <FaBone />, description: 'Traitement des affections de l appareil locomoteur.' },
];

const SpecialtyListSection: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-0 w-2/3">
      <h2 className="text-2xl font-sans font-bold mb-8 text-center">Nos Spécialités</h2>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <ul>
            {specialties.map((specialty, index) => (
              <li key={index} className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-3xl mr-4 text-prim">{specialty.icon}</span>
                  <span className="text-xl font-semibold font-mono">{specialty.name}</span>
                </div>
                <p className="text-sec ml-12 font-sans text-base">{specialty.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/2 mt-12">
          <img
            src={image}
            alt="Illustration des spécialités médicales"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SpecialtyListSection;
