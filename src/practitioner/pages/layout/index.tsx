import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-wh dark:bg-side ">
      {/* Sidebar for larger screens */}
      {!isSmallScreen && (
        <div className="w-24 hover:w-64 transition-all duration-300 ease-in-out">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-wh dark:bg-side p-6 overflow-y-auto">
        {/* Navbar */}
        <div className="mb-6 dark:bg-side">
          <Navbar toggleSidebar={toggleSidebar} isSmallScreen={isSmallScreen} />
        </div>

        {/* Outlet (main content) */}
        <div className="flex-1 overflow-y-auto p-4 bg-wh dark:bg-side">
          <Outlet />
        </div>
      </div>

      {/* Overlay and sidebar for small screens */}
      {isSmallScreen && isSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={toggleSidebar}></div>
          <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 z-40 transition-transform duration-300 ease-in-out transform">
            <Sidebar closeSidebar={toggleSidebar} />
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
