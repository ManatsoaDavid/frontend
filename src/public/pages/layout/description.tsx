import React from 'react';
import specialImage from '../../../image/consultant.png';

const Description: React.FC = () => {
  return (
    <section className="bg-prim text-white py-12 container">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 px-6">
        {/* Image Section */}
        <div className="lg:w-1/2 relative">
          <div className="bg-transparent absolute -top-10 -left-10 rounded-full h-40 w-40"></div>
          <img
            src={specialImage}
            alt="Specialties"
            className="relative z-10 rounded-lg"
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl lg:text-3xl font-bold mb-4 font-mono">Vous êtes soignant ?</h2>
          <p className="mb-6">
            Équipez-vous du site web Ra-Doko pour gagner en confort de travail.
          </p>
          <ul className="space-y-4 text-base text-sans">
            <li>➤ Libérez du temps médical grâce à la prise de rendez-vous en ligne et un logiciel moderne</li>
            <li>➤ Développez l'activité de votre cabinet selon vos besoins grâce à une meilleure visibilité en ligne</li>
            <li>➤ Gagnez en confort de travail au quotidien en réduisant les appels téléphoniques à votre cabinet</li>
            <li>➤ Améliorez l'accès aux soins pour vos patients en leur proposant la meilleure des expériences</li>
          </ul>
          <button className="mt-6 bg-side text-white py-3 px-6 rounded-lg shadow-md hover:bg-prim transition duration-300">
            Inscrivez-vous ici
          </button>
        </div>
      </div>
    </section>
  );
};

export default Description;
