import axiosInstance from 'api/axiosInstance';
import React, { useEffect, useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import InputMask from 'react-input-mask';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [phoneExists, setPhoneExists] = useState(false);

  useEffect(() => {
    const checkPhone = async () => {
      if (value.replace(/[^0-9]/g, '').length === 10) {
        try {
          const response = await axiosInstance.post(`users/check-phone`, { contact: value });
          setPhoneExists(response.data.exists);
        } catch (error) {
          console.error('Error checking phone:', error);
        }
      }
    };

    checkPhone();
  }, [value]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FaPhone className="text-gray-400 text-xl" />
      </div>
      <InputMask
        mask="03* ** *** **"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-10 pr-3 py-2 border ${phoneExists ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-prim`}
        placeholder="03x xx xxx xx"
      />
      <label htmlFor="phone" className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
        Téléphone <span className="text-red-500">*</span>
      </label>
      {phoneExists && <p className="text-red-500 text-xs mt-1">Ce numéro de téléphone est déjà utilisé.</p>}
    </div>
  );
};

export default PhoneInput;
