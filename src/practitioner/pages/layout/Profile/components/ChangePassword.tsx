import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface ChangePasswordProps {
  onSubmit: (oldPassword: string, newPassword: string) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onSubmit }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/change-password/${userId}`, {
        oldPassword,
        newPassword
      });

      if (response.data.success) {
        toast.success('Mot de passe modifié avec succès');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors du changement de mot de passe');
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-dark mb-6">Changer le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faLock} className="text-prim mr-2" />
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-prim"
              placeholder="Ancien mot de passe"
              required
            />
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faLock} className="text-prim mr-2" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-prim"
              placeholder="Nouveau mot de passe"
              required
            />
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faLock} className="text-prim mr-2" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-prim"
              placeholder="Confirmer le nouveau mot de passe"
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-prim text-white px-4 py-2 rounded hover:bg-prim-dark transition duration-300 w-full"
          >
            Changer le mot de passe
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
