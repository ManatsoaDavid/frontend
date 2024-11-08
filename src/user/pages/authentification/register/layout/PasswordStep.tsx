import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaArrowLeft, FaLock, FaSave } from 'react-icons/fa';
import { UserModel } from 'user/models/register.model';
import InputField from '../components/InputField';


interface PasswordStepProps {
  formData: Partial<UserModel>;
  updateFormData: (data: Partial<UserModel>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PasswordStep: React.FC<PasswordStepProps> = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordLength, setPasswordLength] = useState(0);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    updateFormData({ password: newPassword });
    setPasswordLength(newPassword.length);
  };

  const handlePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmedPassword = e.target.value;
    setConfirmPassword(confirmedPassword);
    setPasswordError(formData.password !== confirmedPassword ? 'Les mots de passe ne correspondent pas' : '');
  };

  const isFormValid = () => {
    return formData.password && formData.password.length >= 8 && confirmPassword === formData.password;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, ease: 'easeIn', duration: 0.8 }
      }}
    >
      <div className="bg-transparent p-8 rounded-lg  max-w-md mx-auto">
        <h4 className="text-2xl font-bold mb-6 text-center text-prim">Créez votre mot de passe</h4>
        <form className="space-y-6">
          <InputField
            icon={<FaLock className="text-gray-400 text-xl" />}
            type="password"
            id="password"
            label="Nouveau mot de passe"
            value={formData.password || ''}
            onChange={handlePasswordChange}
          />
          {passwordLength >= 8 && (
            <p className="text-green-500 text-sm mt-1">Mot de passe valide</p>
          )}
          {passwordLength > 0 && passwordLength < 8 && (
            <p className="text-red-500 text-sm mt-1">Le mot de passe doit contenir au moins 8 caractères</p>
          )}
          <InputField
            icon={<FaLock className="text-gray-400 text-xl" />}
            type="password"
            id="confirmPassword"
            label="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={handlePasswordConfirmation}
          />
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </form>
        <div className="mt-8 flex justify-between">
          <button className="bg-secondary text-white px-6 py-2 rounded-lg flex items-center transition-colors hover:bg-secondary-dark" onClick={prevStep}>
            <FaArrowLeft />
          </button>
          <button
            className={`px-6 py-2 rounded-lg flex items-center transition-colors
            ${isFormValid() ? 'bg-prim text-white hover:bg-prim-dark' : 'bg-gray-400 text-red cursor-not-allowed'}`}
            onClick={nextStep}
            disabled={!isFormValid()}
          >

            <FaSave />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default PasswordStep;
