import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center mb-4 border-b pb-4 border-gray-200 dark:border-gray-700">
      <img src="/path/to/logo.png" alt="Logo" className="h-8 mr-2" />
      <span className="text-lg font-bold sm:text-xl">e-Dokotera</span>
    </div>
  );
};

export default Logo;
