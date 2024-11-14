import axiosInstance from 'api/axiosInstance';
import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import InputField from './InputField';

/********************DEFINITION DU PROPS******************** */
interface EmailInputProps {
  email: string;
  updateEmail: (email: string) => void;
}

/***********************COMPOSANT ********************* */
const EmailInput: React.FC<EmailInputProps> = ({ email, updateEmail }) => {

  const [emailError, setEmailError] = useState('');

  /***********************FONCTION POUR VERIFIER LE FORMAT DE L'EMAIL******* */
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    updateEmail(newEmail);
    if (newEmail && !validateEmail(newEmail)) {
      setEmailError('Adresse e-mail invalide');
    } else {
      setEmailError('');
      if (newEmail) {
        const exists = await checkEmailExists(newEmail);
        if (exists) {
          setEmailError('Cette adresse e-mail est déjà utilisée');
        }
      }
    }
  };

  /************************FONCTION POUR VERIFIER SI L'EMAIL EXISTE DANS LE SYSTEME ********************* */
  const checkEmailExists = async (email: string) => {
    try {
      const response = await axiosInstance.post('users/check-email', { email });
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  return (
    <div>
      <InputField
        icon={<FaEnvelope className="text-gray-400 text-xl" />}
        type="email"
        id="email"
        label="Email"
        value={email}
        onChange={handleEmailChange}
      />
      {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
    </div>
  );
};

export default EmailInput;
