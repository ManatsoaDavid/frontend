import { logout } from 'admin/redux.toolkit/loginAdmin/reducer';
import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import Swal from 'sweetalert2';

/**************************INTERFACE DU COMPOSANT*************************/
interface LogoutButtonProps {
  text: string;
  icon: string;
}

/**************************COMPOSANT PRINCIPAL*************************/
const LogoutButton: React.FC<LogoutButtonProps> = ({ text, icon }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /**************************GESTION DE LA DÉCONNEXION*************************/
  const handleLogout = () => {
    Swal.fire({
      title: 'Déconnexion',
      text: 'Êtes-vous sûr de vouloir vous déconnecter?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, me déconnecter',
      cancelButtonText: 'Annuler',
      background: '#fff',
      customClass: {
        container: 'font-poppins',
        title: 'text-prim',
        confirmButton: 'bg-prim',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate('/admin');
        Swal.fire({
          title: 'Déconnecté!',
          text: 'Vous avez été déconnecté avec succès.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <motion.button
      onClick={handleLogout}
      className="w-full flex items-center px-6 py-3 text-red-500 rounded-lg
        bg-white shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff]
        hover:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]
        transition-all duration-300 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <i className={`${icon} mr-3 text-xl group-hover:rotate-12 transition-transform duration-300`}></i>
      <span className="font-medium">{text}</span>
    </motion.button>
  );
};

export default LogoutButton;
