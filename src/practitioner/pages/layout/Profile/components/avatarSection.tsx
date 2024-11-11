import { faCamera, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';

interface AvatarSectionProps {
  praticien: IPractitionerWithUser
  onAvatarUpdate: (updatedpraticien: IPractitionerWithUser) => void;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({ praticien, onAvatarUpdate }) => {

  const IMAGE_API = `${process.env.REACT_APP_API_URL?.replace('/api', '') || ''}/uploads`;
  const API = process.env.REACT_APP_API_URL;


  const handleFileUpload = async (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(`${API}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data.filePath;
      } catch (error) {
        console.error('Erreur lors du telechargement de fichier:', error);
        return null;
      }
    }
    return null;
  };

  const handleAvatarUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && praticien) {
      const avatarPath = await handleFileUpload(file);
      if (avatarPath) {
        const updatedpraticien = {
          ...praticien,
          user: {
            ...praticien.user,
            avatar: avatarPath
          }
        };
        onAvatarUpdate(updatedpraticien);
      }
    }
  };

  return (
    <div className="w-48 h-48 rounded-xl overflow-hidden shadow-xl mb-4 relative">
      {praticien?.user.avatar ? (
        <img src={`${IMAGE_API}/${praticien.user.avatar}`} alt="User Avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} className="text-4xl text-gray-400" />
        </div>
      )}
      <label htmlFor="avatar-upload" className="absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition duration-300">
        <FontAwesomeIcon icon={faCamera} className="text-prim" />
      </label>
      <input
        id="avatar-upload"
        type="file"
        onChange={handleAvatarUpdate}
        className="hidden"
      />
    </div>
  );
};

export default AvatarSection;
