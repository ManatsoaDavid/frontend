import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        flex items-center px-4 py-2 rounded-md transition-colors duration-300
        ${isActive
          ? 'bg-white text-blue'
          : 'text-sec hover:bg-white hover:text-blue'
        }
      `}
    >
      <div className="mr-2">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default NavbarLink;
