import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { UserModel } from 'user/models/register.model';
import UserTypeStep from '../components/userType';
import FileUploadStep from './FileUploadStep';
import PasswordStep from './PasswordStep';
import AvatarUploadStep from './avatarUploadStep';
import ConfirmationStep from './confirmationStep';
import LeftPanel from './leftRegisterPanel';
import PersonalInfoStep from './personalInfoStep';
import PractitionerModernStep from './practitionerModernStep';
import VisitorStep from './visitorStep';


const RegisterStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserModel>>({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleRegistrationSuccess = () => {
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
      // Optionally, you can redirect the user or reset the form here
    }, 5000); // Hide the alert after 5 seconds
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <UserTypeStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 2:
        return (
          <PersonalInfoStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <AvatarUploadStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <PasswordStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={() => {
              if (formData.userType === 'VISITEUR') {
                setCurrentStep(6); // Skip to VisitorStep
              } else {
                nextStep(); // Go to FileUploadStep for practitioners
              }
            }}
            prevStep={prevStep}
          />
        );
      case 5:
        return <FileUploadStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        if (formData.userType === 'PRATICIEN') {
          return <PractitionerModernStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={() => setCurrentStep(4)} />
        } else if (formData.userType === 'VISITEUR') {
          return <VisitorStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={() => setCurrentStep(4)} />;
        }
        break;
      case 7:
        return <ConfirmationStep formData={formData} prevStep={prevStep} onRegistrationSuccess={handleRegistrationSuccess} />;
      default:
        return null;
    }
  };


  const handleLoginClick = () => {

  };

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, ease: 'easeIn', duration: 0.8 }
      }}
    >
      <div className="min-h-screen flex items-center justify-center p-4 ">
        <div className="min-h-screen flex items-center justify-center p-auto ">
          {showSuccessAlert && (
            <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 text-center">
              Inscription réussie! Vos données ont été enregistrées.
            </div>
          )}
        </div>

        <div className="w-full max-w-6xl bg-transparent rounded-3xl overflow-hidden flex flex-col lg:flex-row  lg:h-[90vh] ">
          <LeftPanel onLoginClick={handleLoginClick} />

          {/* Partie droite avec le formulaire d'inscription */}
          <div className="w-full lg:w-1/2 p-6 lg:p-5">
            {/* Indicateur d'étapes */}
            <div className="flex justify-center mb-2 lg:mb-8 ">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-5 h-5 lg:w-10 lg:h-10 rounded-full flex items-center justify-center mr-2 ${currentStep >= step ? 'bg-prim text-white' : 'bg-gray-300'
                    }`}
                >
                  {step}
                </div>
              ))}
            </div>
            {/* Rendu de l'étape actuelle */}
            {renderStep()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterStepper;
