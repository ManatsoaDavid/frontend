import { motion } from 'framer-motion';
import doctor from "image/icone/doctorteam.png";
import patient from "image/icone/patient.png";
import React from 'react';

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
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.2, ease: 'easeOut', duration: 0.8 }
      }}
      className="min-h-[400px] flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-auto w-full backdrop-blur-sm bg-white/90">

        <h3 className="text-xl font-semibold mb-6 text-center text-prim font-mono">Choisissez votre profil</h3>
        <p className='text-sec text-center mb-8 font-sans'>Sélectionnez le type de compte qui vous correspond le mieux</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300
              ${formData.userType === 'PRATICIEN'
                ? 'border-2 border-prim text-prim bg-blue-50'
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'}`}
            onClick={() => handleUserTypeClick('PRATICIEN')}
          >
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <img src={doctor} alt="Praticien" className="w-16 h-16" />
            </div>
            <span className="font-bold text-lg mb-2">Praticien</span>
            <span className="text-sm text-gray-600 text-center">Pour les professionnels de santé</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300
              ${formData.userType === 'VISITEUR'
                ? 'border-2 border-prim text-prim bg-blue-50'
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'}`}
            onClick={() => handleUserTypeClick('VISITEUR')}
          >
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <img src={patient} alt="Visiteur" className="w-16 h-16" />
            </div>
            <span className="font-bold text-lg mb-2">Visiteur</span>
            <span className="text-sm text-gray-600 text-center">Pour les patients ou les visiteurs</span>
          </motion.button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Choisissez votre profil pour continuer.
        </p>
      </div>
    </motion.div>
  );
};

export default UserTypeStep;
