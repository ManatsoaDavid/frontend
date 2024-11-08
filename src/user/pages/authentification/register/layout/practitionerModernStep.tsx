import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowLeft, FaBuilding, FaIdCard, FaSave } from 'react-icons/fa';


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
        <h2 className="text-2xl font-bold mb-6 text-prim text-center">Information du praticien moderne</h2>
        <form className="space-y-6">
          <div className="flex items-center space-x-4">
            <FaIdCard className="text-2xl text-prim" />
            <div className="flex-grow">
              <label htmlFor="nationalIdNumber" className="block mb-1 font-medium">Numéro d'identification nationale</label>
              <input
                type="text"
                id="nationalIdNumber"
                value={formData.nationalIdNumber}
                onChange={(e) => updateFormData({ nationalIdNumber: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-prim focus:border-transparent"
                placeholder="Entrez votre numéro d'identification"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaBuilding className="text-2xl text-prim" />
            <div className="flex-grow">
              <label htmlFor="officeAddress" className="block mb-1 font-medium">Adresse du cabinet</label>
              <input
                type="text"
                id="officeAddress"
                value={formData.officeAddress}
                onChange={(e) => updateFormData({ officeAddress: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-prim focus:border-transparent"
                placeholder="Entrez l'adresse de votre cabinet"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaBuilding className="text-2xl text-prim" />
            <div className="flex-grow">
              <label htmlFor="specialty" className="block mb-1 font-medium">specialite</label>
              <input
                type="text"
                id="specialty"
                value={formData.specialty}
                onChange={(e) => updateFormData({ specialty: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-prim focus:border-transparent"
                placeholder="Entrez votre specialite"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaBuilding className="text-2xl text-prim" />
            <div className="flex-grow">
              <label htmlFor="category" className="block mb-1 font-medium">categorie</label>
              <input
                type="text"
                id="category"
                value={formData.category}
                onChange={(e) => updateFormData({ category: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-prim focus:border-transparent"
                placeholder="Quelle categorie ?"
              />
            </div>
          </div>


        </form>
        <div className="mt-8 flex justify-between">
          <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition duration-300" onClick={prevStep}>
            <FaArrowLeft />
          </button>
          <button
            className="bg-prim text-white px-6 py-3 rounded-lg hover:bg-prim-dark transition duration-300"
            onClick={nextStep}
            disabled={!formData.nationalIdNumber || !formData.officeAddress}
          >
            <FaSave />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PractitionerModernStep;
