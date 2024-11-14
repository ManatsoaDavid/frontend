import React, { useState } from 'react';
import { FaCaretDown, FaQuestionCircle, FaUser, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../../utils/logo/logo.png';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-prim text-side p-auto">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-4xl font-bold ">
          <img src={logo} alt="Logo" className="h-auto w-20" />
        </Link>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/register" className="flex items-center hover:text-prim text-white transition-colors font-mono shadow-md shadow-light hover:shadow-prim">
            <FaUserPlus className="mr-2" />
            Etes vous un praticien ?
          </Link>
          <Link to="/help" className="flex items-center  hover:text-prim text-light transition-colors font-mono">
            <FaQuestionCircle className="mr-2" />
            Aides
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center hover:text-prime text-light transition-colors"
            >
              <FaUser /> <FaCaretDown className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Se connecter</Link>
                <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">S'inscrir</Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-light focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isDropdownOpen && (
        <div className="md:hidden mt-4">
          <Link to="/signup" className="block py-2 hover:bg-gray-700">Sign Up</Link>
          <Link to="/help" className="block py-2 hover:bg-gray-700">Help Center</Link>
          <Link to="/login" className="block py-2 hover:bg-gray-700">Login</Link>
          <Link to="/settings" className="block py-2 hover:bg-gray-700">Settings</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
