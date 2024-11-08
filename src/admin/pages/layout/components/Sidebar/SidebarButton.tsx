import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarLinkProps {
  text: string;
  icon: string;
  to: string;
  isActive: boolean;
  hasSubmenu?: boolean;
  badge?: number;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  text,
  icon,
  to,
  isActive,
  hasSubmenu,
  badge,
  onClick
}) => {
  return (
    <Link to={to} className="block w-full">
      <motion.div
        className={`
          w-full mb-2 flex items-center px-3 py-2.5
          rounded-lg transition-all duration-300 ease-in-out
          text-sm md:text-base
          ${isActive
            ? 'bg-prim text-white shadow-[inset_3px_3px_6px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(255,255,255,0.1)]'
            : 'bg-gray-100 text-gray-700 shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]'
          }
        `}
        onClick={onClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <i className={`${icon} mr-2.5 text-lg ${isActive ? 'text-white' : 'text-prim'}`}></i>
        <span className={`font-medium tracking-wide ${isActive ? 'text-white' : 'text-gray-800'}`}>
          {text}
        </span>
        {badge && (
          <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
            {badge}
          </span>
        )}
        {hasSubmenu && (
          <i className={`bi bi-chevron-${isActive ? 'down' : 'right'} ml-auto text-sm ${badge ? 'mr-2' : ''}`} />
        )}
      </motion.div>
    </Link>
  );
};

export default SidebarLink;
