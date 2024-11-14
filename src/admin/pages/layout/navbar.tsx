import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaBell, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'admin/redux.toolkit/loginAdmin/reducer';
import Swal from 'sweetalert2';
import logo from '../../../utils/logo/logo.png';
import { NavbarItem } from './components/Navbar/NavbarItem';
import { ProfileDropdown } from './components/Navbar/ProfileDropdown';

const Navbar: React.FC<{ toggle: () => void }> = ({ toggle }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: 'Déconnexion',
      text: 'Êtes-vous sûr de vouloir vous déconnecter?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate('/login');
      }
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-gray-50 to-gray-100 h-14 shadow-[0_2px_4px_#d1d9e6] fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-3 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggle}
              className="p-2 rounded-lg bg-white shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff]
                         hover:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]
                         transition-all duration-200"
            >
              <FaBars className="text-prim" size={18} />
            </motion.button>
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </div>

          <div className="flex items-center space-x-3">
            <NavbarItem
              icon={<FaBell size={16} />}
              badge={3}
              tooltip="Notifications"
              onClick={() => { }}
            />
            <NavbarItem
              icon={<FaCog size={16} />}
              tooltip="Paramètres"
              onClick={() => { }}
            />
            <ProfileDropdown
              isOpen={isProfileOpen}
              onToggle={() => setIsProfileOpen(!isProfileOpen)}
              onLogout={handleLogout}
              userData={{
                name: 'NATIK CORP',
                email: 'natik-corp@gmail.com'
              }}
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
