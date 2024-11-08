import { motion } from 'framer-motion';
import React from 'react';
import { FaUser, FaUserMd } from 'react-icons/fa';

const UserTypeStep: React.FC<{
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
}> = ({ formData, updateFormData, nextStep }) => {
  const handleUserTypeClick = (userType: string) => {
    updateFormData({ userType: userType });
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, ease: 'easeIn', duration: 0.8 }
      }}
    >
      <div className="bg-white p-8 rounded-lg  max-w-md mx-auto bg-transparent">
        <h2 className="text-2xl font-bold mb-6 text-center text-prim">Choisissez votre profil</h2>
        <p className='text-sec text-center'>Praticien si vous êtes un praticien sinon un visiteur !</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 ${formData.userType === 'PRATICIEN' ? 'border-2 border-prim text-prim' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => handleUserTypeClick('PRATICIEN')}
          >
            <FaUserMd className="text-4xl mb-2" />
            <span className="font-semibold">Praticien</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 ${formData.userType === 'VISITEUR' ? 'border-2 border-prim text-prim' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => handleUserTypeClick('VISITEUR')}
          >
            <FaUser className="text-4xl mb-2" />
            <span className="font-semibold">Visiteur</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserTypeStep;
