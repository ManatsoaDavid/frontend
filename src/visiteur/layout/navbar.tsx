import React, { useState } from 'react';
import { FaCalendar, FaCaretDown, FaHistory, FaQuestionCircle, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useUserData } from 'shared/hooks/fetchUser';
import { localStorageService } from 'utils/localStorageService';
import logo from '../../utils/logo/logo.png';
import LogoutButton from './component/logoutButton';

const NavbarVisitor: React.FC = () => {
  const userId = localStorageService.getItem('userData')?.userId;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userData } = useUserData(userId);


  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate('profile');
  };

  const IMAGE_API = `${process.env.REACT_APP_API_URL?.replace('/api', '') || ''}/uploads`;

  return (
    <nav className="bg-prim text-side p-auto">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/visitor/visitor-home" className="text-4xl font-bold">
          <img src={logo} alt="Logo" className="h-auto w-24" />
        </Link>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/visitor/rendez-vous" className="flex items-center hover:text-prim transition-colors font-mono">
            <FaCalendar className="mr-2" />
            Rendez-vous
          </Link>
          <Link to="/historique" className="flex items-center hover:text-prim transition-colors font-mono">
            <FaHistory className="mr-2" />
            Historique
          </Link>
          <Link to="/help" className="flex items-center hover:text-prim transition-colors font-mono">
            <FaQuestionCircle className="mr-2" />
            Aides
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center hover:text-prim transition-colors"
            >
              {userData && userData.avatar ? (
                <img src={`${IMAGE_API}/${userData.avatar}`} alt={userData.name} className="w-8 h-8 rounded-full mr-2" />
              ) : (
                <FaUser className="mr-2" />
              )}
              <FaCaretDown className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <i className='bi bi-person-circle  mr-2 fs-4'></i><span>Profile</span></button>
                <LogoutButton
                  text="Déconnexion"
                  icon="bi-box-arrow-right"
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-side focus:outline-none"
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
          <Link to="/rendez-vous" className="block py-2 hover:bg-gray-700">Rendez-vous</Link>
          <Link to="/historique" className="block py-2 hover:bg-gray-700">Historique</Link>
          <Link to="/help" className="block py-2 hover:bg-gray-700">Aides</Link>
          <Link to="/visitor/profile" className="block py-2 hover:bg-gray-700">Profile</Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarVisitor;
