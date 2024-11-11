import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        flex items-center px-4 py-2 rounded-md transition-colors duration-300
        ${isActive
          ? ' text-prim'
          : 'text-sec  hover:text-prim'
        }
      `}
    >
      <div className="mr-8 ">{icon}</div>
      <span className="text-sm font-medium ml-2">{label}</span>
    </Link>
  );
};

export default SidebarLink;
