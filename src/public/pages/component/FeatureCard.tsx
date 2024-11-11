import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-transparent p-4 justify-center text-center rounded-lg  transition duration-300 hover:shadow-lg hover:shadow-prim">
    <div className="text-side text-3xl ">{icon}</div>
    <h3 className="text-xl font-semibold text-side mb-2 font-mono">{title}</h3>
    <p className="text-sec font-sans">{description}</p>
  </div>
);

export default FeatureCard;
