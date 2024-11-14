import React from 'react';
import DarkMode from './DarkMode';
import Notification from './Notification';
import ProfileNavbar from './ProfileNavbar';

const RightSide: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">

      <Notification />
      <ProfileNavbar />
      <DarkMode />
    </div>
  );
};

export default RightSide;
