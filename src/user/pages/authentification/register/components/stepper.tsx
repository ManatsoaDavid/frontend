import React from 'react';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center mb-4 lg:mb-8">
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map((step) => (
        <div
          key={step}
          className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center mr-2 ${currentStep >= step ? 'bg-prim text-white' : 'bg-gray-300'
            }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
