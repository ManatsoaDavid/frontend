import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface FeatureProps {
  type: string;
}

const SubscriptionFeatures: React.FC<FeatureProps> = ({ type }) => {
  const features = {
    LITE: [
      { name: 'Accès basique', included: true },
      { name: 'Support standard', included: true },
      { name: 'Nombre de patients limité', included: true },
      { name: 'Analyses avancées', included: false },
      { name: 'Export des données', included: false },
    ],
    PREMIUM: [
      { name: 'Accès complet', included: true },
      { name: 'Support premium', included: true },
      { name: 'Patients illimités', included: true },
      { name: 'Analyses avancées', included: true },
      { name: 'Export des données', included: false },
    ],
    GOLD: [
      { name: 'Accès VIP', included: true },
      { name: 'Support prioritaire 24/7', included: true },
      { name: 'Patients illimités', included: true },
      { name: 'Analyses avancées', included: true },
      { name: 'Export des données', included: true },
    ],
  };

  return (
    <div className="flex-grow space-y-4 mb-6">
      {features[type as keyof typeof features]?.map((feature, index) => (
        <div key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          {feature.included ? (
            <FaCheck className="text-green-500" />
          ) : (
            <FaTimes className="text-red-500" />
          )}
          <span>{feature.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionFeatures;
