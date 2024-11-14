import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

interface ProfileDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
  userData: {
    name: string;
    email: string;
  };
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  onToggle,
  onLogout,
  userData
}) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="p-2 rounded-lg bg-white text-prim
                   shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff]
                   hover:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]
                   transition-all duration-200"
      >
        <FaUser size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-1 w-44 bg-white rounded-lg
                       shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]"
          >
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-800">{userData.name}</p>
              <p className="text-xs text-gray-500">{userData.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center px-3 py-2 text-sm text-red-600
                         hover:bg-red-50 transition-colors duration-200"
            >
              <FaSignOutAlt className="mr-2" size={14} />
              Se déconnecter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
