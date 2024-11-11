import { faBirthdayCake, faEnvelope, faHome, faPhone, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';

interface EditPractitionerModalProps {
  isOpen: boolean;
  onClose: () => void;
  practitionerData: IPractitionerWithUser;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const EditPractitionerModal: React.FC<EditPractitionerModalProps> = ({ isOpen, onClose, practitionerData, onInputChange, onSubmit }) => {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-dark">Modifier le profil du praticien</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div className="space-y-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="text-prim mr-2" />
              <input
                name="user.name"
                value={practitionerData.user.name}
                onChange={onInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-prim"
                placeholder="Nom"
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="text-prim mr-2" />
              <input
                name="user.firstName"
                value={practitionerData.user.firstName}
                onChange={onInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-prim"
                placeholder="Prénom"
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="text-prim mr-2" />
              <input
                name="user.gender"
                value={practitionerData.user.gender}
                onChange={onInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-prim"
                placeholder="genre"
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-prim mr-2" />
              <input
                name="user.email"
                value={practitionerData.user.email}
                onChange={onInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-prim"
                placeholder="Email"
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="text-prim mr-2" />
              <input
                name="user.contact"
                value={practitionerData.user.contact}
                onChange={onInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-prim"
                placeholder="Contact"
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faHome} className="text-prim mr-2" />
              <input
                name="officeAddress"
                value={practitionerData.officeAddress}
                onChange={onInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-prim"
                placeholder="Adresse du cabinet"
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBirthdayCake} className="text-prim mr-2" />
              <input
                type="date"
                name="user.birthDate"
                value={practitionerData.user.birthDate && !isNaN(new Date(practitionerData.user.birthDate).getTime())
                  ? new Date(practitionerData.user.birthDate).toISOString().split('T')[0]
                  : ''}
                onChange={onInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-prim"
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="text-prim mr-2" />
              <input
                name="specialty"
                value={practitionerData.specialty}
                onChange={onInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-prim"
                placeholder="Spécialité"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-prim text-white px-4 py-2 rounded hover:bg-prim-dark transition duration-300"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPractitionerModal;
