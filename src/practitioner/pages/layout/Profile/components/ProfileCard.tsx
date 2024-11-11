import React from 'react';

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
        <div>
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-gray-500">Praticien</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Informations personnelles</h3>
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> johndoe@example.com
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Téléphone:</span> 01 23 45 67 89
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">À propos</h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
