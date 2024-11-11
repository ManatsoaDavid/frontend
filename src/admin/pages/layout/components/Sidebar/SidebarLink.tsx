import React from 'react';
import { motion } from 'framer-motion';
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
          w-full mb-1.5 flex items-center px-3 py-2
          rounded-lg transition-all duration-200
          text-sm
          ${isActive
            ? 'bg-gradient-to-r from-prim to-prim/90 text-white shadow-md'
            : 'bg-white text-gray-700 shadow-sm hover:shadow-inner'
          }
        `}
        onClick={onClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <i className={`${icon} mr-2 text-base ${isActive ? 'text-white' : 'text-prim'}`} />

        <span className="font-medium">
          {text}
        </span>

        {badge && (
          <span className={`
            px-1.5 py-0.5 text-xs rounded-full ml-auto
            min-w-[20px] text-center
            ${isActive
              ? 'bg-white text-prim'
              : 'bg-prim text-white'
            }
          `}>
            {badge}
          </span>
        )}

        {hasSubmenu && (
          <motion.i
            className={`bi bi-chevron-${isActive ? 'down' : 'right'} ml-auto text-xs ${badge ? 'mr-2' : ''}`}
            animate={{ rotate: isActive ? 180 : 0 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default SidebarLink;
