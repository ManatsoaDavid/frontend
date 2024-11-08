import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const HomeAdmin: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
    }

    const handleResize = () => {
      const smallScreen = window.innerWidth < 768; // Changed breakpoint to 768px
      setIsSmallScreen(smallScreen);
      setSidebarVisible(!smallScreen);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AnimatePresence>
        {sidebarVisible && (
          <motion.div
            initial={{ x: isSmallScreen ? -320 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
              ${isSmallScreen ? 'fixed inset-y-0 left-0 z-50' : 'relative'}
              bg-gray-100 shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]
              rounded-r-2xl
            `}
          >
            <div>
              <Sidebar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggle={toggleSidebar} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>

      {isSmallScreen && sidebarVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-40"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default HomeAdmin;
