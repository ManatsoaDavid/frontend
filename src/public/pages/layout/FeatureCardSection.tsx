import React from 'react';
import { FaLightbulb, FaRocket, FaUserMd } from "react-icons/fa";
import FeatureCard from "../component/introCard";

const FeatureCardSection: React.FC = () => {
  return (
    <div className="bg-blue-100 container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<FaLightbulb />}
          title="Recherche Intelligente"
          description="Faites des recherches rapides et précises avec notre moteur de recherche intelligent."
        />
        <FeatureCard
          icon={<FaRocket />}
          title="Rendez-vous"
          description="Prenez des rendez-vous avec des professionnels de santé en quelques clics."
        />
        <FeatureCard
          icon={<FaUserMd />}
          title="Professionnels Qualifiés"
          description="Accédez à un réseau de professionnels de santé qualifiés et expérimentés."
        />
      </div>
    </div>
  );
};

export default FeatureCardSection;
