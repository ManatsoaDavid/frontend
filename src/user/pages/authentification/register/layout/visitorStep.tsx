import React from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

const VisitorStep: React.FC<{
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}> = ({ formData, updateFormData, nextStep, prevStep }) => {
  return (
    <div className="bg-white p-6 rounded-lg ">
      <h2 className="text-2xl font-bold mb-4">information du visiteur</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="address" className="block mb-1">Votre addresse</label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
      </form>
      <div className="mt-6 flex justify-between">
        <button className="bg-secondary text-white px-4 py-2 rounded" onClick={prevStep}>
          <FaArrowLeft />
        </button>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={nextStep}
          disabled={!formData.address}
        >
          <FaSave />

        </button>
      </div>
    </div>
  );
};

export default VisitorStep;
