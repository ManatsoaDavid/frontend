import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import avatar2 from '../../../image/avatar1.png';
import avatar3 from '../../../image/avatar5.png';
import avatar from '../../../image/doctor.png';

const CelebratedPractitionersSection: React.FC = () => {
  const celebratedPractitioners = [
    { name: 'Dr. John Doe', specialty: 'Cardiologie', rating: 4.9, image: avatar },
    { name: 'Dr. Jane Smith', specialty: 'Neurologie', rating: 4.8, image: avatar2 },
    { name: 'Dr. Mike Johnson', specialty: 'Ophtalmologie', rating: 4.7, image: avatar3 },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto ">
        <h2 className="text-2xl font-bold font-mono font-side text-center mb-10 ">Nos praticiens les plus célèbres</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {celebratedPractitioners.map((practitioner, index) => (
            <div key={index} className="bg-light rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <img
                  src={practitioner.image}
                  alt={practitioner.name}
                  className="mx-auto mb-4 object-cover rounded-full w-24 h-24"
                />
                <div>
                  <h3 className="text-xl font-semibold text-dark">{practitioner.name}</h3>
                  <p className="text-sec">{practitioner.specialty}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
                <span className="text-dark font-semibold">{practitioner.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CelebratedPractitionersSection;
