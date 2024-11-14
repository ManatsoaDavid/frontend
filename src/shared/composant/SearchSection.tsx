import image from 'image/groupe.png';
import React from 'react';
import PractitionerSearch from './practitionerSearch';
import WelcomeText from './welcomeText';

const SearchAndIntro: React.FC = () => {
  return (
    <div className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <WelcomeText />
            <PractitionerSearch />
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img src={image} alt="E-Dokotera Hero" className="max-w-md w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndIntro;
