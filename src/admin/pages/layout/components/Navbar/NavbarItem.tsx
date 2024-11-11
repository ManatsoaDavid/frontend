import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from './Tooltip';

interface NavbarItemProps {
  icon: ReactNode;
  tooltip?: string;
  badge?: number;
  onClick: () => void;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({ icon, tooltip, badge, onClick }) => {
  return (
    <motion.div className="relative">
      <Tooltip content={tooltip}>
        <button
          onClick={onClick}
          className="p-2 rounded-lg bg-white text-prim
                     shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff]
                     hover:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]
                     transition-all duration-200"
        >
          {icon}
          {badge && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs
                           rounded-full h-4 w-4 flex items-center justify-center">
              {badge}
            </span>
          )}
        </button>
      </Tooltip>
    </motion.div>
  );
};
