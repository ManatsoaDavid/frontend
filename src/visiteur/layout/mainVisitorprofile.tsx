import React from 'react';
import Sidebar from './component/profile/sidebarVisiteur';
import UserProfile from './component/profile/visitorProfile';

const MainVisitorProfil: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row my-10 px-56">
      <div className='mx-4 my-4 md:mx-10 md:my-10'>
        <UserProfile />
      </div>

      <div className="flex-1 p-4 md:p-10">
        <Sidebar />

      </div>
    </div>
  );
};

export default MainVisitorProfil;
