import React from 'react';
import { UserModel } from 'user/models/register.model';
import UserTypeStep from '../components/userType';
import FileUploadStep from '../layout/FileUploadStep';
import PasswordStep from '../layout/PasswordStep';
import ConfirmationStep from '../layout/confirmationStep';
import PersonalInfoStep from '../layout/personalInfoStep';
import PractitionerModernStep from '../layout/practitionerModernStep';
import VisitorStep from '../layout/visitorStep';


interface RenderStepProps {
  currentStep: number;
  formData: Partial<UserModel>;
  updateFormData: (data: Partial<UserModel>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const RenderStep: React.FC<RenderStepProps> = ({ currentStep, formData, updateFormData, nextStep, prevStep }) => {

  const handleRegistrationSuccess = () => {
  };

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
        <PasswordStep
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 4:
      return <FileUploadStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
    case 5:
      if (formData.userType === 'PRATICIEN') {
        return <PractitionerModernStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      } else if (formData.userType === 'VISITEUR') {
        return <VisitorStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      }
      return null;
    case 6:
      return (
        <ConfirmationStep
          formData={formData}
          prevStep={prevStep}
          onRegistrationSuccess={handleRegistrationSuccess}
        />
      );
    default:
      return null;

  };


}
export default RenderStep;
