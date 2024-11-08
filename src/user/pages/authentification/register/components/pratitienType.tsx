import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowLeft, FaGraduationCap, FaLeaf } from 'react-icons/fa';


interface PractitionerTypeChoiceProps {
  formData: any;
  updateFormData: (data: any) => void;
  onBack: () => void;
}

const PractitionerTypeChoice: React.FC<PractitionerTypeChoiceProps> = ({ formData, updateFormData, onBack }) => {
  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, ease: 'easeIn', duration: 0.8 }
      }}
    >
      <div className="">
        <div className="grid grid-cols-2 gap-4">
          <button
            className={`flex flex-col items-center justify-center p-4 rounded-lg  ${formData.practitionerType === 'MODERNE' ? 'border-2 border-prim text-prim' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => updateFormData({ practitionerType: 'MODERNE' })}
          >
            <FaGraduationCap className="text-4xl mb-2" />
            <span className="font-semibold">Diplômé</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center p-4 rounded-lg  ${formData.practitionerType === 'TRADITIONNEL' ? 'border-2 border-prim text-prim' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => updateFormData({ practitionerType: 'TRADITIONNEL' })}
          >
            <FaLeaf className="text-4xl mb-2" />
            <span className="font-semibold">Traditionnel</span>
          </button>
        </div>
        <button
          className="mt-4 flex items-center justify-center text-prim hover:text-prim-dark transition-colors duration-300"
          onClick={onBack}
        >
          <FaArrowLeft className="mr-2" />
          Retour
        </button>
      </div>
    </motion.div>
  );
};

export default PractitionerTypeChoice;
