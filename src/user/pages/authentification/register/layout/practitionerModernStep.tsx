import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import OfficeAddressInput from '../components/officeAdressInput';
import PractitionerDropdowns from '../components/practitionerDropdown';


const PractitionerModernStep: React.FC<{
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}> = ({ formData, updateFormData, nextStep, prevStep }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, ease: 'easeIn', duration: 0.8 }
      }}
    >
      <div className="bg-transparent p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-prim text-center">Information du praticien </h2>
        <form className="space-y-6">
          <PractitionerDropdowns formData={formData} updateFormData={updateFormData} />

          <div className="flex items-center space-x-4">
            <OfficeAddressInput
              value={formData.officeAddress || ''}
              onChange={(newAddress) => updateFormData({ ...formData, officeAddress: newAddress })}
            />
          </div>
        </form>
        <div className="mt-8 flex justify-between">
          <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition duration-300" onClick={prevStep}>
            <FaArrowLeft />
          </button>
          <button
            className="bg-prim text-white px-6 py-3 rounded-lg hover:bg-prim-dark transition duration-300"
            onClick={nextStep}
            disabled={!formData.specialty || !formData.officeAddress}
          >
            <FaSave />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PractitionerModernStep;
