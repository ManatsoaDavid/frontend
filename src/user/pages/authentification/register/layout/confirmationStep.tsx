import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowLeft, FaEnvelope, FaPhone, FaSave, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { registerUser } from 'user/redux.toolkit/register/reducer';

const ConfirmationStep: React.FC<{
  formData: any;
  prevStep: () => void;
  onRegistrationSuccess: () => void;
}> = ({ formData, prevStep, onRegistrationSuccess }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.user);

  const handleSubmit = async () => {
    try {
      await dispatch(registerUser(formData) as any);
      onRegistrationSuccess();
    } catch (error) {
      console.error('Une erreur s\' produit , verifiez vos données', error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, ease: 'easeIn', duration: 0.8 }
      }}
    >
      <div className="bg-white p-8 rounded-lg  max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-prim">Confirmer votre inscription</h2>
        <div className="space-y-4">


          <div className="flex items-center">
            <FaUser className="text-primary mr-3" />
            <p><strong>Nom:</strong> {formData.name}</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-primary mr-3" />
            <p><strong>Email:</strong> {formData.email}</p>
          </div>
          <div className="flex items-center">
            <FaPhone className="text-primary mr-3" />
            <p><strong>Contact:</strong> {formData.contact}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <button
            className="bg-secondary text-white p-3 rounded-full hover:bg-secondary-dark transition duration-300 ease-in-out"
            onClick={prevStep}
            aria-label="precedent"
          >
            <FaArrowLeft />
          </button>
          <button
            className="bg-prim text-white p-3 rounded-full hover:bg-prim-dark transition duration-300 ease-in-out"
            onClick={handleSubmit}
            disabled={isLoading}
            aria-label="enregistrer"
          >
            {isLoading ? (
              <span className="animate-spin">↻</span>
            ) : (
              <FaSave />
            )}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </motion.div>
  );
}
export default ConfirmationStep;
