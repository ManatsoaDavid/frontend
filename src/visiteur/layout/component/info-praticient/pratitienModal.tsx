import React from 'react';
import { FaEnvelope, FaHome, FaPhone, FaUserMd } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';
import avatar from '../../../../image/avatar5.png';
import { usePractitionerData } from '../../../../shared/hooks/fetchPractitioner';

interface PractitionerModalProps {
  User: IPractitionerWithUser;
  isOpen: boolean;
  onClose: () => void;
}

const PractitionerModal: React.FC<PractitionerModalProps> = ({ User, isOpen, onClose }) => {

  const { practitionerData, loading, error } = usePractitionerData(User.practitionerId || 0);

  if (!isOpen) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const IMAGE_API = `${process.env.REACT_APP_API_URL?.replace('/api', '') || ''}/uploads`;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div className="flex items-center mb-4">
          {User.user.avatar ? (
            <img
              src={`${IMAGE_API}/${User.user.avatar}`}
              alt={`${User.user.name} ${User.user.firstName}`}
              className="w-16 h-16 rounded-full mr-4"
            />
          ) : (
            <img
              src={avatar}
              alt={`${User.user.name} ${User.user.firstName}`}
              className="w-16 h-16 rounded-full mr-4"
            />
          )}
          <h2 className="text-2xl font-bold">{User.user.name} {User.user.firstName}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <p><FaPhone className="mr-2" /> <strong>Contact:</strong> {User.user.contact}</p>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <p><FaHome className="mr-2" /> <strong>Adresse du cabinet:</strong> {User.officeAddress}</p>
            <p><FaUserMd className="mr-2" /> <strong>Spécialité:</strong> {User.specialty}</p>
            <p><FaUserMd className="mr-2" /> <strong>Catégorie:</strong> {User.category}</p>            </div>
        </div>

        <div className="flex justify-between mt-6">
          <Link to={`/visitor/info-pratitient/${User.practitionerId}`}>
            <button
              className="bg-prim text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
              <FaEnvelope className="mr-2" /> Contacter
            </button>
          </Link>

          <button
            onClick={onClose}
            className="bg-sec text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PractitionerModal;
