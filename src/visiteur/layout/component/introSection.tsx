import React from 'react';
import SearchAndIntroContent from './IntroContent';



const SearchAndIntro: React.FC = () => {
  return (
    <div className=" py-12  bg-prim">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center aligh-center mb-8">
          <SearchAndIntroContent />

        </div>

      </div>
    </div>
  );
};

export default SearchAndIntro;
