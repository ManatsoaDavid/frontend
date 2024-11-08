import React from 'react';

interface CardProps {
  title: string;
  content: string | number;
  icon: React.ReactNode;
  color?: string; // Optional to pass color for customization
}

const Card: React.FC<CardProps> = ({ title, content, icon, color = "bg-white" }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${color} flex items-center`}>
      <div className="text-3xl mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-lg">{content}</p>
      </div>
    </div>
  );
};

export default Card;
