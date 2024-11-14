import bone from "image/icone/bones.png";
import brain from "image/icone/brain.png";
import eye from "image/icone/eye-care.png";
import heartbeat from "image/icone/heartbeat.png";
import tooth from "image/icone/tooth.png";
import React from 'react';
import image from '../../../image/image2.jpg';

interface Specialty {
  name: string;
  icon: React.ReactElement;
  description: string;
}

const specialties: Specialty[] = [
  {
    name: 'Cardiologie',
    icon: <img src={heartbeat} alt="Cardiologie" className="w-10 h-10" />,
    description: 'Diagnostic et traitement des maladies du cœur et des vaisseaux sanguins.'
  },
  {
    name: 'Neurologie',
    icon: <img src={brain} alt="Neurologie" className="w-10 h-10" />,
    description: 'Étude et traitement des troubles du système nerveux.'
  },
  {
    name: 'Dentisterie',
    icon: <img src={tooth} alt="Dentisterie" className="w-10 h-10" />,
    description: 'Soins dentaires et traitement des problèmes bucco-dentaires.'
  },
  {
    name: 'Ophtalmologie',
    icon: <img src={eye} alt="Ophtalmologie" className="w-10 h-10" />,
    description: 'Diagnostic et traitement des maladies des yeux.'
  },
  {
    name: 'Orthopédie',
    icon: <img src={bone} alt="Orthopédie" className="w-10 h-10" />,
    description: 'Traitement des affections de l appareil locomoteur.'
  },
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
