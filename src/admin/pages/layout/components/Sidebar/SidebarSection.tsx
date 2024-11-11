import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import SidebarLink from './SidebarLink';

interface SidebarSectionProps {
  title: string;
  icon: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  icon,
  isExpanded,
  onToggle,
  children
}) => {
  return (
    <div className="mb-2">
      <SidebarLink
        text={title}
        icon={icon}
        to="#"
        isActive={isExpanded}
        hasSubmenu={true}
        onClick={onToggle}
      />
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-3 mt-1 space-y-1"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default SidebarSection;
