import React from 'react';

interface AvatarProps {
  imageUrl: string;
  name: string;
  role: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, name, role }) => {
  return (
    <div className="flex items-center mb-6">
      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
      </div>
    </div>
  );
};

export default Avatar;
