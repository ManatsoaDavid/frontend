import ampoule from "image/icone/ampoule.png";
import doctor from "image/icone/doctor.png";
import fuse from "image/icone/fuse.png";
import React from 'react';
import FeatureCard from "../component/FeatureCard";

const FeatureCardSection: React.FC = () => {
  return (
    <div className="bg-blue-100 container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<img src={ampoule} alt="Recherche" className="w-12 h-12" />}
          title="Recherche Intelligente"
          description="Faites des recherches rapides et précises avec notre moteur de recherche intelligent."
        />
        <FeatureCard
          icon={<img src={fuse} alt="Rendez-vous" className="w-12 h-12" />}
          title="Rendez-vous"
          description="Prenez des rendez-vous avec des professionnels de santé en quelques clics."
        />
        <FeatureCard
          icon={<img src={doctor} alt="Professionnels" className="w-12 h-12" />}
          title="Professionnels Qualifiés"
          description="Accédez à un réseau de professionnels de santé qualifiés et expérimentés."
        />
      </div>
    </div>
  );
};

export default FeatureCardSection;
