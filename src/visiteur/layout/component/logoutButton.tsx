import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import Swal from 'sweetalert2';
import { logout } from 'visiteur/redux-toolkit/reducer';

interface logoutButtonProps {
  text: string;
  icon: string;

}

const LogoutButton: React.FC<logoutButtonProps> = ({ text, icon }) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /**************FONCTION*************** */
  const handleLogout = () => {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir vous déconnecter?',
      text: "Vous devrez vous reconnecter pour accéder à votre compte.",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate('/');

      }
    });
  };


  return (
    <button onClick={handleLogout} className="bg-white w-full mb-2 flex items-center px-2 py-1 text-side rounded-md    hover:bg-gray-100  ">
      <i className={`bi ${icon} mr-2 fs-4`}></i>
      {text}
    </button>
  )
}

export default LogoutButton
