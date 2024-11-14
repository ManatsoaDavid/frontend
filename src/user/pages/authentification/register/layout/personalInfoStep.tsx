import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowLeft, FaSave, FaUser } from 'react-icons/fa';
import { UserModel } from 'user/models/register.model';
import InputField from '../components/InputField';
import EmailInput from '../components/emailInput';
import PhoneInput from '../components/phonInput';


interface FormData {
  name: string;
  firstName: string;
  email: string;
  contact: string;
  gender: string;
}

interface PersonalInfoStepProps {
  formData: Partial<UserModel>;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ formData, updateFormData, nextStep, prevStep }) => {
  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.contact
    );
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
        <h4 className="text-2xl font-bold mb-6 text-center text-prim">Informations Personnelles</h4>
        <form className="space-y-6">
          <InputField icon={<FaUser className="text-gray-400 text-xl" />} type="text" id="name" label="Nom" value={formData.name || ''} onChange={(e) => updateFormData({ name: e.target.value })} />
          <InputField
            icon={<FaUser className="text-gray-400 text-xl" />}
            type="text"
            id="firstName"
            label="Prénom"
            value={formData.firstName || ''}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            required={false}
          />
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium mb-2">Genre</label>
            <div className="flex gap-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Homme"
                  checked={formData.gender === 'Homme'}
                  onChange={(e) => updateFormData({ gender: e.target.value })}
                  className="form-radio text-prim focus:ring-prim h-4 w-4"
                />
                <span className="text-gray-700">Homme</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Femme"
                  checked={formData.gender === 'Femme'}
                  onChange={(e) => updateFormData({ gender: e.target.value })}
                  className="form-radio text-prim focus:ring-prim h-4 w-4"
                />
                <span className="text-gray-700">Femme</span>
              </label>
            </div>
          </div>
          <EmailInput
            email={formData.email || ''}
            updateEmail={(email: string) => updateFormData({ email })}
          />
          <PhoneInput
            value={formData.contact || ''}
            onChange={(value) => updateFormData({ contact: value })}
          />
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

export default PersonalInfoStep;
